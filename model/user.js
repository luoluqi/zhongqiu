const Sequelize = require('sequelize');
const sequelize = require("./sequelize");
const user = sequelize.define("user",{
    openid:{type: Sequelize.STRING ,primaryKey: true},
    nickname:{type: Sequelize.STRING},
    headimgurl:{type: Sequelize.STRING(1000)},

    dateStr:{type: Sequelize.STRING},

    num1:{type: Sequelize.INTEGER,defaultValue:0},

    score1:{type: Sequelize.INTEGER,defaultValue:0},

    num2:{type: Sequelize.INTEGER,defaultValue:0},

    score2:{type: Sequelize.INTEGER,defaultValue:0},

    num3:{type: Sequelize.INTEGER,defaultValue:0},

    score3:{type: Sequelize.INTEGER,defaultValue:0},

    scoreTotal:{type: Sequelize.INTEGER,field:"score_total",defaultValue:0},

    num4:{type: Sequelize.INTEGER,defaultValue:0},
    score4:{type: Sequelize.INTEGER,defaultValue:0},
});

module.exports = user;

user.sync();
