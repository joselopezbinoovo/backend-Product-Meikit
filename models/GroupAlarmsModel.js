const {DataTypes}= require('sequelize');
const sequelize = require('../db/connection');
const variables = require('./VariablesModel');

const groupAlarms =  sequelize.define("GroupAlarms",{
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    etiqueta:{
        type:DataTypes.STRING
    }
},{
    timestamps:false,
    freezeTableName: true
  });



  groupAlarms.hasMany(variables,{
    foreignKey:"id_group",
    sourceKey:"id"
  })
  variables.belongsTo(groupAlarms, { foreignKey: "id_group", targetId: "id" });




module.exports = groupAlarms