const {DataTypes}= require('sequelize');
const sequelize = require('../db/connection');
const users = require('./UsersModel');
const roles = sequelize.define("Roles", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      role_name: {
        type: DataTypes.INTEGER
      },
  },{
    timestamps:false,
    freezeTableName: true
  });

  roles.hasMany(users,{
    foreignKey:"id_role",
    sourceKey:"id"
  })
  users.belongsTo(roles, { foreignKey: "id_role", targetId: "id" });

module.exports = roles;