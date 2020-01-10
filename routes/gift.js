var express = require("express");
var router = express.Router();

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var gift = require("../model/gift");
var user = require("../model/user");
var product = require("../model/product");




router.post("/add", function (req, res) {
    var body = req.body;

    var openid = body.openid
    var score = parseInt(body.score);
    var productId = parseInt(body.productId);
    var scoreTotal = 0;




    user.findOne({where:{openid:openid}}).then(function(ca){

        scoreTotal = ca.score4 - score;
       

        if(scoreTotal < 0){
            res.json({code:0,msg:"积分不够"});
        }else{
            return product.findOne({ where: {id: productId} });


            
        }

        
    }).then((p) => {
        if(p.num > 0){
            return product.update({num:p.num-1},{
                where:{
                    id:productId
                }
            })
        }else{
            res.json({code:0,msg:"奖品兑换完了！"});
        }
    }).then(() => {
        return user.update({score4:scoreTotal}, {
            where: {
                openid: openid//查询条件
            }
        })
    })
    
    .then(function(){
        delete body.score;
        return gift.create(body)
    }).then(function(){
        res.json({code:1,msg:"添加成功"});
        
    })

});

router.post("/my", function (req, res) {
    var body = req.body;

    var openid = body.openid

    gift.findAll({ where: { openid: openid } }).then((list) => {
        res.json({code:1,msg:"ok",list:list});
    });
});


module.exports = router;