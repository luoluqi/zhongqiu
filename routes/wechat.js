var request = require("request");
var wxUtil = require("../util/wxUtil");
var express = require("express");
var router = express.Router();
//https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfa0cb6f4d5730bf7&redirect_uri=http://127.0.0.1/test.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect
router.use("/getAccessToken", function (req, res) {
   
    var body = req.body;
    var code = body.code;
    var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid="+wxUtil.appid+"&secret="+wxUtil.appSecret+"&code="+code+"&grant_type=authorization_code";

    request(url,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
               res.send(body);
            }
    });

});

router.post("/getUserInfo", function (req, res) {
    var body = req.body;
    var access_token = body.access_token;
    var openid = body.openid;
    var url = "https://api.weixin.qq.com/sns/userinfo?access_token="+access_token+"&openid="+openid+"&lang=zh_CN";

    request(url,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
               res.send(body);
            }
    });

});

router.post("/getConfig", function (req, res) {
    var body = req.body;
    var url = body.url;
    var config = wxUtil.getSignature(url);

    res.send(config);
});

router.post("/payCallback",function(req,res){
   var xml = "";
   req.on("data",function(chunk){
       xml += chunk;
   });
   req.on("end",function(){
      if(wxUtil.checkSignByXml(xml)){
        console.log("支付结果通知，检查sign通过");
        //执行逻辑操作
      }else{
          console.log("支付结果通知，检查sign不通过");
      }
      var str = "<xml>\n" +
          "  <return_code><![CDATA[SUCCESS]]></return_code>\n" +
          "  <return_msg><![CDATA[OK]]></return_msg>\n" +
          "</xml>";

       res.send(str);
   })

});


module.exports = router;