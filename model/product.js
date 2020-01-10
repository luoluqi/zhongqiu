const Sequelize = require('sequelize');
const sequelize = require("./sequelize");
const product = sequelize.define("product",{
    id:{type: Sequelize.INTEGER ,primaryKey: true,autoIncrement: true},
    img:{type: Sequelize.STRING},
    name:{type: Sequelize.STRING},
    score:{type: Sequelize.INTEGER },
    num:{type: Sequelize.INTEGER }
});

module.exports = product;

product.sync();
