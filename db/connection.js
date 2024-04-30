const Sequelize = require ('sequelize')


const sequelize = new Sequelize('productoMeikit', 'postgres', '123456', {
    //host: 'producto_db',
    host:'localhost',
    dialect: 'postgres',
});



module.exports= sequelize