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
  variableString: {
    type: DataTypes.STRING,
  },
  variableName: {
    type: DataTypes.STRING
  },
  serverConnection: {
    type: DataTypes.STRING,
  }
},{
  timestamps:false,
  freezeTableName: true
});




module.exports = valorPLC;