import MbdPay from "../dist/bundle.esm.js"
// import MbdPay from "../src/index.js"
// let MbdPay = require("../dist/bundle.common");
let _MbdPay = new MbdPay("appid", "appkey");
let res = await _MbdPay.alipay_pay({
    amount_total: 1
});
console.log(res);