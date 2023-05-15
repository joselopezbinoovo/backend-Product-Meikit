const {DataTypes}= require('sequelize');
const sequelize = require('../db/connection');


const users = sequelize.define("Users", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      image: {
        type: DataTypes.STRING
      }
  },{
    timestamps:false,
    freezeTableName: true
  });

module.exports = users;