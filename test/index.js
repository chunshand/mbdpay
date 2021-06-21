import mbdpay from "../dist/bundle.esm.js"
// import MbdPay from "../src/index.js"
// let MbdPay = require("../dist/bundle.common");
// import mbdpay from "mbdpay"

let Mpay = new mbdpay("appid", "appkey")

// 获取openid 
// let openid = await Mpay.wx_openid("http://baidu.com");
// console.log(openid);

// let res = await Mpay.wx_h5_prepay({
//     description: '测试内容 描述',
//     amount_total: 1
// });
// console.log(res);


let res = await Mpay.alipay_pay({
    description: '测试内容 描述',
    amount_total: 1
});
console.log(res);