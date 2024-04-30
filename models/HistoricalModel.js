const {DataTypes}= require('sequelize');
const sequelize = require('../db/connection');
const variables = require('./VariablesModel')


const historical = sequelize.define("historical", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      desc_variable: {
        type: DataTypes.STRING
      },
      plcValue: {
        type: DataTypes.STRING
      },
      unidad: {
        type: DataTypes.STRING
      },
      desc_entity: {
        type: DataTypes.STRING
      },
      date:{
        type: DataTypes.DATE
      },
  },{
    timestamps:false,
    freezeTableName: true
  });


  variables.hasMany(historical,{
    foreignKey:"id_variable",
    sourceKey:"id"
  })
  historical.belongsTo(variables, { foreignKey: "id_variable", targetId: "id" });


module.exports = historical;