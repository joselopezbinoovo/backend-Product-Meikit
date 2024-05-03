const {DataTypes}= require('sequelize');
const sequelize = require('../db/connection');
const groupAlarms = require('./GroupAlarmsModel');

const groupCorreos =  sequelize.define("GroupCorreos",{
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    name:{
        type:DataTypes.STRING
    }
},{
    timestamps:false,
    freezeTableName: true
  });



  groupCorreos.hasMany(groupAlarms,{
    foreignKey:"id_groupCorreos",
    sourceKey:"id"
  })
  groupAlarms.belongsTo(groupCorreos, { foreignKey: "id_groupCorreos", targetId: "id" });




module.exports = groupCorreos