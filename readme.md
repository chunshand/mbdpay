## 面包pay 是一个支持个人支付的哦

## 前提

 [注册面包多](https://mianbaoduo.com/o/login)

 [开发设置](https://mbd.pub/dev)

 appid appkey

 [闪电结算](https://mianbaoduo.com/o/config/transaction/profile)

 [api文档](https://doc.mbd.pub/)


 简单方法，即可实现自己的网站个人支付
### 安装
```

```
### 声明
```javascript

import mbdpay from "mbdpay"

let Mpay  = new mbdpay("appid","appkey")

```
### 微信 js 网页支付
```javascript
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
```
### 微信 h5 网页支付
```javascript

let res = Mpay.wx_js_prepay({
    // description string 商品描述
    // amount_total number 商品价格
    // out_trade_no 订单号

});

```
### 支付宝 网页支付
```javascript

let res = Mpay.alipay_pay({
    // description string 商品描述
    // amount_total number 商品价格
    // out_trade_no 订单号

});

```
### 查询订单
```javascript

let res = Mpay.search_order("out_trade_no");

```

### 退款
```javascript

let res = Mpay.refund("out_trade_no");

```