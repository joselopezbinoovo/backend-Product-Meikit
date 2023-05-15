const {DataTypes}= require('sequelize');
const sequelize = require('../db/connection');


const valorPLC = sequelize.define("VariablesPLC", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      variable_data: {
        type: DataTypes.INTEGER
      },
      variable_name: {
        type: DataTypes.STRING
      },
      connecition_string: {
        type: DataTypes.STRING
      }  
  },{
    timestamps:false,
    freezeTableName: true
  });

module.exports = valorPLC;