var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var user = require("../model/user");

var result = require("../util/result");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/getRound",function(req, res, next) {
  res.json({code:1,msg:"ok",round:global.round});
});



router.post('/setRound', function(req, res, next) {
  var body = req.body;
 



  var where = {};
    var pageNum = 1;
    var pageSize = 10;
   

    var order = [['score' + global.round, 'DESC']];
    

    user.findAndCountAll({
        where: where,
        order:order,
        offset: (pageNum - 1) * pageSize,
        limit: pageSize
    }).then(function(data){
       var rows = data.rows;
       for(var item of rows){
        result.winners.push(item.openid);
       }
      
    }).catch(function(e){
       
    });


    global.round = parseInt(body.round + "");
    result.clear();

  res.json({code:1,msg:"ok",round:global.round});

});

router.post("/restart",function(req, res, next) {
  global.round = 1;
  result.clear();
  result.winners = [];

  var param = {
    num1:0,
    score1:0,
    num2:0,
    score2:0,
    num3:0,
    score3:0,
    scoreTotal:0,
    num4:0,
    score4:0,
  }
  user.update(param, {
    where: {
     
    }
}).then(function(){

  res.json({code:1,msg:"ok restart",round:global.round});
}).catch(function(e){
    res.json({code:0,msg:e});
});


 
})

module.exports = router;
