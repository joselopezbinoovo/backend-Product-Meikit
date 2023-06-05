const {DataTypes}= require('sequelize');
const sequelize = require('../db/connection');
const variables = require('./VariablesModel')


const valorPLC = sequelize.define("ValoresPLC", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      variable_data: {
        type: DataTypes.STRING
      },
      variable_name: {
        type: DataTypes.STRING
      },
      connection_string: {
        type: DataTypes.STRING
      }  
  },{
    timestamps:false,
    freezeTableName: true
  });




module.exports = valorPLC;