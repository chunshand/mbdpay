// axios
import axios from 'axios'
import md5 from "md5"
// mbdpay config url 
const mbd_url_config = {
    wx_prepay: "https://api.mianbaoduo.com/release/wx/prepay",
    alipay_pay: "https://api.mianbaoduo.com/release/alipay/pay",
    refund: "https://api.mianbaoduo.com/release/main/refund",
    search_order: "https://api.mianbaoduo.com/release/main/search_order",
    openid: "https://mbd.pub/openid"
}

function ksort(o) {
    let sorted = {},
        keys = Object.keys(o);
    keys.sort();
    keys.forEach((key) => {
        sorted[key] = o[key];
    })
    return sorted;
}
class MbdPay {
    constructor(app_id, app_key) {
        this.app_id = app_id;
        this.app_key = app_key;
    };
    // 创建签名
    static CreateSign(options, key) {
        options = ksort(options);
        let sign = "";
        for (let i in options) {
            sign += i + "=" + options[i] + "&";
        }
        sign = sign + "key=" + key;
        sign = md5(decodeURI(sign));
        return sign;
    }

    /**
     *  获取openid
     */
    openid(target_url) {
        let options = {};
        options.app_id = this.app_id;
        options.target_url = target_url;
        let sign = MbdPay.CreateSign(options, this.app_key);
        options.sign = sign;
        return axios.get(mbd_url_config.openid, options)
    }

    /**
     *  微信 JSAPI 支付
     */
    wx_js_prepay(options = {}) {
        options.app_id = this.app_id;
        let sign = MbdPay.CreateSign(options, this.app_key);
        options.sign = sign;
        return axios.post(mbd_url_config.wx_prepay, options)
    }

    /**
     *  微信 H5 支付
     */
    wx_h5_prepay(options = {}) {
        options.app_id = this.app_id;
        options.channel = "h5";
        let sign = MbdPay.CreateSign(options, this.app_key);
        options.sign = sign;
        return axios.post(mbd_url_config.wx_prepay, options)
    }

    /**
     *  支付宝 支付
     */
    alipay_pay(options = {}) {
        options.app_id = this.app_id;
        let sign = MbdPay.CreateSign(options, this.app_key);
        options.sign = sign;
        return axios.post(mbd_url_config.alipay_pay, options)
    }

    /**
     *  退款
     */
    refund(order_id) {
        let options = {};
        options.app_id = this.app_id;
        options.order_id = order_id;
        let sign = MbdPay.CreateSign(options, this.app_key);
        options.sign = sign;
        return axios.post(mbd_url_config.refund, options)
    }


    /**
     *  查询订单
     */
    search_order(order_id) {
        let options = {};
        options.app_id = this.app_id;
        options.order_id = order_id;
        let sign = MbdPay.CreateSign(options, this.app_key);
        options.sign = sign;
        return axios.post(mbd_url_config.search_order, options)
    }



}

export default MbdPay;