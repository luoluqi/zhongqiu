var bbData = require("../util/baseData");



var result = {
    tempData : [].concat(bbData),
    userMap:{},
    winners:[],
    topCount:0,
    createResult:function(openid){

        if(this.userMap[openid]){
            return this.userMap[openid];
        }

        var random = 0;
        if(this.winners.includes(openid)){
            random = this.getRandom(500,this.tempData.length - 1);
        }else{
            if(this.getRandom(1,10) > 5 && this.topCount < 10){
                random = this.getRandom(0,100);
                this.topCount ++;
            }else{
                random = this.getRandom(500,this.tempData.length - 1);
            }

           
        }

        
        var result = this.tempData[random];
        this.tempData.splice(random,1);
        this.userMap[openid] = result;
        return result;
    },

    getRandom:function(n,m){
       
        var random = Math.floor(Math.random()*(m-n+1)+n);
        return random;
    },

    clear : function(){
        this.tempData = [].concat(bbData);
        this.userMap = {};
        this.topCount=0;
    },

    getSpreadResult:function(){
        var  random = this.getRandom(0,this.tempData.length - 1);
        var result = bbData[random];
        return result;
    }
}

module.exports = result;