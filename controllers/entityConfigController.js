const EntityConfing = require('../models/EntityConfigModel'); 
const Entity = require('../models/EntityModel')

const getAllEntityConfig = async( req,res) => {
    try {
        const entitiesConfig = await EntityConfing.findAll({
            order: [["id", "DESC"]],
        })
        res.status(200).json({
            msg:'Datos Obtenidos',
            data:entitiesConfig
        })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getOneEntityConfig = async( req,res) => {
    try {
        const id = req.params.id
        const oneEntity= await EntityConfing.findByPk(id, {
            include: [ 
              {
                model: Entity ,
              },
            ],
          });
            
    res.status(200).json({
        msg:'Dato Obtenido',
        data:oneEntity
    })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


module.exports = { getAllEntityConfig, getOneEntityConfig}