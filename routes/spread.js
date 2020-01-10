var express = require("express");
var router = express.Router();

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var user = require("../model/user");
var product = require("../model/product");
var result = require("../util/result");




router.post("/login", function (req, res) {
    var body = req.body;
    user.findOrCreate({where:{openid:body.openid},defaults:body})
        .spread(function(ca,created){

            var re = result.getSpreadResult();
            
           
            var score = ca.score4;
            var num = ca.num4;
            res.json({
                code:1,
                result:re,
                score:score,
                num:num
              
                
            });

          
        })

});


router.post("/update",function(req,res){
    var body = req.body;
    var openid = body.openid;
    var num = parseInt(body.num);
    var score = parseInt(body.score);

    //var param = Object.assign({}, body);

    if(num > 3){
        res.json({code:0,msg:"您今天次数用完了"});
        return;
    }

    user.findOne({where:{openid:openid}}).then(function(ca){
        if(ca){
           
            var param = {};
          
            param.num4 = num;
            param.score4 = ca.score4+ score;
            
            user.update(param, {
                where: {
                    openid: openid//查询条件
                }
            }).then(function(){

                res.json({code:1,msg:"修改成功"});
            }).catch(function(e){
                res.json({code:0,msg:e});
            });
        }else{
           res.json({code:0,msg:"用户不存在"});
        }
    });
});

router.post("/addNum",function(req,res){
    var body = req.body;
    var openid = body.openid;

    user.findOne({where:{openid:openid}}).then(function(ca){
        if(ca){
            console.log(ca);
            if(ca.dateStr == "1"){
                res.json({code:0,msg:"今天已经分享过了"});
                return;
            }


           var num = ca.num4 - 1;
            var param = {};
          
            param.num4 = num;
            param.dateStr = "1";
          
            console.log(param,openid)
            user.update(param, {
                where: {
                    openid: openid//查询条件
                }
            }).then(function(){
                console.log(1)
                res.json({code:1,msg:"修改成功",num:num});
            }).catch(function(e){
                console.log(2)
                res.json({code:0,msg:e});
            });
        }else{
           res.json({code:0,msg:"用户不存在"});
        }
    });
})

router.post("/getProduct",function(req,res){
   
    product.findAll().then(products => {
        res.json({code:1,products:products});
    })
})

module.exports = router;


