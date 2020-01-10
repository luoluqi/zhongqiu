var baseData = [
    {id:1,name:"状元插金花",score:65},
    {id:2,name:"六杯红",score:60},
    {id:3,name:"六杯黑",score:55},
    {id:4,name:"五王",score:50},
    {id:5,name:"五子带一秀",score:45},
    {id:6,name:"五子登科",score:40},
    {id:7,name:"状元",score:35},
    {id:8,name:"对堂",score:30},
    {id:9,name:"三红",score:25},
    {id:10,name:"四进",score:20},
    {id:11,name:"二举",score:15},
    {id:12,name:"一秀",score:10}
]

var data = [];
for(var one of baseData){
    for(var two of baseData){
        for(var three of baseData){
            var arr = [];
            arr.push(one);
            arr.push(two);
            arr.push(three);
            data.push(arr);
        }
    }
}

data.sort(function(a,b){
    var aScore = 0;
    for(var item of a){
        aScore += item.score;
    }
    var bScore = 0;
    for(var item of b){
        bScore += item.score;
    }
    return bScore - aScore;
});


module.exports = data;
