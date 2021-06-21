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
     * 获取openid跳转url 
     * @param {string}} target_url
     */
    async wx_openid(target_url) {
        let options = {};
        options.app_id = this.app_id;
        options.target_url = target_url;
        let sign = MbdPay.CreateSign(options, this.app_key);
        options.sign = sign;
        let res = await axios.get(mbd_url_config.openid, options);
        res.data = MbdPay.helper("wx_openid", res);
        return res;
    }

    /**
     *  微信 JSAPI 支付
     * @param {object} options {} 
     */
    async wx_js_prepay(options = {}, openid = '') {
        options.app_id = this.app_id;
        options.openid = openid;
        let sign = MbdPay.CreateSign(options, this.app_key);
        options.sign = sign;
        let res = await axios.post(mbd_url_config.wx_prepay, options)
        res.data = MbdPay.helper("wx_js_prepay", res);
        return res;
    }

    /**
     *  微信 H5 支付
     * @param {object} options {} 
     */
    async wx_h5_prepay(options = {}) {
        options.app_id = this.app_id;
        options.channel = "h5";
        let sign = MbdPay.CreateSign(options, this.app_key);
        options.sign = sign;
        let res = await axios.post(mbd_url_config.wx_prepay, options)
        res.data = MbdPay.helper("wx_h5_prepay", res);
        return res;
    }

    /**
     *  支付宝 支付
     * @param {object} options {} 
     */
    async alipay_pay(options = {}) {
        options.app_id = this.app_id;
        let sign = MbdPay.CreateSign(options, this.app_key);
        options.sign = sign;
        let res = await axios.post(mbd_url_config.alipay_pay, options);
        res.data = MbdPay.helper("alipay_pay", res);
        return res;
    }

    /**
     *  退款
     * @param {string} order_id 订单号
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
     * 查询订单
     * @param {string} order_id 订单号
     * @returns
     */
    search_order(order_id) {
        let options = {};
        options.app_id = this.app_id;
        options.order_id = order_id;
        let sign = MbdPay.CreateSign(options, this.app_key);
        options.sign = sign;
        return axios.post(mbd_url_config.search_order, options)
    }

    /**
     * 帮助方法
     * @param {string} type 方法名
     * @param {object} data 返回data
     * 
     * 帮助解析返回值
     */
    static helper(type, { data }) {
        if (!data.error) {
            let old_data = data;
            let new_data = data;
            switch (type) {
                case "wx_openid":
                    let reg = data.toString().match(/window.location.href\=\'(.*)\'/);
                    new_data = {
                        data: old_data,
                        url: reg ? reg[1] : null
                    };
                    break;
                case "wx_js_prepay":
                    break;
                case "wx_h5_prepay":
                    break;
                case "alipay_pay":
                    let arr = data.body.match(/<input.*?(?:\/>)/gi);
                    let obj = {};
                    for (let i in arr) {
                        if (i == 0) {
                            continue;
                        }
                        let reg = /name=\'(.*)\'.*value=\'(.*)\'/;
                        let item_arr = arr[i].match(reg);
                        obj[item_arr[1]] = item_arr[2];

                    }
                    let action_reg = data.body.match(/action=\'(.*)\' method/);
                    let action = action_reg[1];
                    new_data = {
                        data: old_data,
                        param: obj,
                        action,
                    };
                    break;
                default:
                    break;
            }
            return new_data;

        }
        return data;
    }



}

export default MbdPay;