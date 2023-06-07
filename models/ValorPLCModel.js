const {DataTypes}= require('sequelize');
const sequelize = require('../db/connection');
const variables = require('./VariablesModel')


const valorPLC = sequelize.define("ValoresPLC", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  variableString: {
    type: DataTypes.STRING,
  },
  variableName: {
    type: DataTypes.STRING
  },
  conectionString: {
    type: DataTypes.STRING,
  }
},{
  timestamps:false,
  freezeTableName: true
});




module.exports = valorPLC;