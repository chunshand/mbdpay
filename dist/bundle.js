!function(e,a){"object"==typeof exports&&"undefined"!=typeof module?module.exports=a(require("axios"),require("md5")):"function"==typeof define&&define.amd?define(["axios","md5"],a):(e="undefined"!=typeof globalThis?globalThis:e||self).mbdpay=a(e.axios,e.md5)}(this,function(e,a){"use strict";function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var n=t(e),o=t(a);function r(e,a){for(var t=0;t<a.length;t++){var i=a[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var p="https://api.mianbaoduo.com/release/wx/prepay",u="https://api.mianbaoduo.com/release/alipay/pay",d="https://api.mianbaoduo.com/release/main/refund",s="https://api.mianbaoduo.com/release/main/search_order",f="https://mbd.pub/openid";return function(){function t(e,a){!function(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}(this,t),this.app_id=e,this.app_key=a}var e,a,i;return e=t,i=[{key:"CreateSign",value:function(e,a){var t,i,n;t=e,i={},(n=Object.keys(t)).sort(),n.forEach(function(e){i[e]=t[e]});var r,p="";for(r in e=i)p+=r+"="+e[r]+"&";return p=p+"key="+a,console.log(p),p=o.default(decodeURI(p))}}],(a=[{key:"wx_js_prepay",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};e.app_id=this.app_id;var a=t.CreateSign(e,this.app_key);return e.sign=a,n.default.post(p,e)}},{key:"wx_h5_prepay",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};e.app_id=this.app_id,e.channel="h5";var a=t.CreateSign(e,this.app_key);return e.sign=a,n.default.post(p,e)}},{key:"alipay_pay",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};e.app_id=this.app_id;var a=t.CreateSign(e,this.app_key);return e.sign=a,n.default.post(u,e)}},{key:"refund",value:function(e){var a={};a.app_id=this.app_id,a.order_id=e;e=t.CreateSign(a,this.app_key);return a.sign=e,n.default.post(d,a)}},{key:"search_order",value:function(e){var a={};a.app_id=this.app_id,a.order_id=e;e=t.CreateSign(a,this.app_key);return a.sign=e,n.default.post(s,a)}},{key:"openid",value:function(e){var a={};a.app_id=this.app_id,a.target_url=e;e=t.CreateSign(a,this.app_key);return a.sign=e,n.default.get(f,a)}}])&&r(e.prototype,a),i&&r(e,i),t}()});
