const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var user = require("../model/user");


function reset(){
    var now = new Date();
    
    
   
  
    var hour  = now.getHours();
    console.log("reset....")
    console.log(hour)
    if(hour == 0){
        console.log("reset...real");
        var param = {
            dateStr:"0",
            num4:0
          
        }
        user.update(param, {
            where: {
                
            }
        }).then(function(){
        
        
        })
    }

    setTimeout(() => {
        reset();
    },3600 * 1000);
}

reset();

