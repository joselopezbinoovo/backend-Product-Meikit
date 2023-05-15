const {DataTypes}= require('sequelize');
const sequelize = require('../db/connection');
const valorPlc = require('./VariablesPLCModel')

const variables = sequelize.define("Variables",{
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      des_variable: {
        type: DataTypes.STRING
      },
      imagen: {
        type: DataTypes.STRING
      },
      variable: {
        type: DataTypes.STRING
      },
      unidad: {
        type: DataTypes.STRING
      }
    
  },{
    timestamps:false,
    freezeTableName: true
  });

  valorPlc.hasOne(variables, {
    foreignKey: 'id_variablePlc'});
    variables.belongsTo(valorPlc, {
    foreignKey: 'id_variablePlc'
  });


module.exports = variables;
 