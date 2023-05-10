const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../connections/db");

const user = sequelize.define("users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  addresses: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
  paranoid: false
});
// user.sync({
//   // alter:{
//   //   drop:false
//   // }
// });
module.exports = user;
