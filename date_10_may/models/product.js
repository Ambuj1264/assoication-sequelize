const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../connections/db");
const products = sequelize.define("product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  realprice: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fakeprice: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
// products.sync({
//   force:true
// });// product (model name) then uses when only need of changes in single model
//  sequelize.sync({force:true}) --> for all model updated
module.exports = products;
