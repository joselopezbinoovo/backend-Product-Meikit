const {DataTypes}= require('sequelize');
const sequelize = require('../db/connection');

const entity = require('./EntityModel')
const entityConfig = sequelize.define("EntityConfig", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
   /*    id_entity: {
        type: DataTypes.INTEGER
      }, */
      color: {
        type: DataTypes.STRING
      }
  },{
    timestamps:false,
    freezeTableName: true
  });

  entity.hasOne(entityConfig, {
  foreignKey: 'entity_id'});
  entityConfig.belongsTo(entity, {
  foreignKey: 'entity_id'
});



module.exports = entityConfig;