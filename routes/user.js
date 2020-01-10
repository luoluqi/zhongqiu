var express = require("express");
var router = express.Router();

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var user = require("../model/user");
var result = require("../util/result");




router.post("/login", function (req, res) {
    var body = req.body;
    user.findOrCreate({where:{openid:body.openid},defaults:body})
        .spread(function(ca,created){

            var re = result.createResult(body.openid);
            
           
            var score = ca["score" + global.round];
            var num = ca["num" + global.round];
            res.json({
                code:1,
                result:re,
                score:score,
                num:num,
                scoreTotal:ca.scoreTotal,
                round:global.round
            });

          
        })

});

router.post("/find",function(req,res){
    var body = req.body;
  
  
    var pageNum = 1;
    var pageSize = 10;
   

    var order = [['score' + global.round, 'DESC']];
    var where = {
        ['score' + global.round]:{
            [Op.gt]: 0,
        }
    };

    user.findAndCountAll({
        where: where,
        order:order,
        offset: (pageNum - 1) * pageSize,
        limit: pageSize
    }).then(function(data){
        res.json({code:1,data:data,round:global.round});
    }).catch(function(e){
        res.json({code:0,msg:e});
    });
});

router.post("/update",function(req,res){
    var body = req.body;
    var openid = body.openid;
    var num = parseInt(body.num);
    var score = parseInt(body.score);

    //var param = Object.assign({}, body);

  

    user.findOne({where:{openid:openid}}).then(function(ca){
        if(ca){
           
           

            var scoreTotal = ca.scoreTotal;

            var param = {};
            param.scoreTotal = scoreTotal + score;
            param["num" + global.round] = num;
            param["score" + global.round] = ca["score" + global.round]+ score;
            
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

router.post("/delete",function(req,res){
    var body = req.body;
    var openid = body.openid;

    user.destroy({where: {openid:openid}})
        .then(function(){

            res.json({code:1,msg:"删除成功"});
        }).catch(function(e){
        res.json({code:0,msg:e});
    });
});


module.exports = router;