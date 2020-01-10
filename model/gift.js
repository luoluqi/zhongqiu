const Sequelize = require('sequelize');
const sequelize = require("./sequelize");
const gift = sequelize.define("gift",{
    openid:{type: Sequelize.STRING },
    gift:{type: Sequelize.STRING},
    name:{type: Sequelize.STRING},
    phone:{type: Sequelize.STRING},
    address:{type: Sequelize.STRING(1000)},
    date:{type: Sequelize.STRING}

   
});

module.exports = gift;

gift.sync();
