const {DataTypes}= require('sequelize');
const sequelize = require('../db/connection');
const groupCorreos = require('./GroupCorreosModel'); 

const correo =  sequelize.define("Correos",{
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    email:{
        type:DataTypes.STRING
    }
},{
    timestamps:false,
    freezeTableName: true
  });



  groupCorreos.hasMany(correo,{
    foreignKey:"id_groupCorreos",
    sourceKey:"id"
  })
  correo.belongsTo(groupCorreos, { foreignKey: "id_groupCorreos", targetId: "id" });




module.exports = correo