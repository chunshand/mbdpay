## 面包pay 是一个支持个人支付的哦


```javascript

import mbdpay from "mbdpay"

let Mpay  = new mbdpay("appid","appkey")


// 微信 js 网页支付--------------------------------------

// 获取openid html
let res = await Mpay.wx_openid("redirectUrl");

// 跳转到url 回调后 获取openid
window.location.href = res.data.url;

// 微信网页支付-适用于微信内网页
Mpay.wx_js_prepay({
    // description string 商品描述
    // amount_total number 商品价格
    // out_trade_no 订单号
    // callback_url 支付后跳转地址

},"openid");

// 微信 h5 网页支付--------------------------------------

let res = Mpay.wx_js_prepay({
    // description string 商品描述
    // amount_total number 商品价格
    // out_trade_no 订单号

},"openid");

```

