const Entity = require('../models/EntityModel'); 
const EntityConfig = require('../models/EntityConfigModel');


const createEntity = async( req,res) => {
    try {

        const body = req.body; 
        const createNewEntity = await Entity.create({
            desc_entity:body.desc_entity,
            ip_entity:body.ip_entity,
            image:body.ip_entity,
            EntityConfig:{
                color:body.entityConfig.color
            }
        },{
            include:EntityConfig
        })

        res.status(200).json({
            msg:'Dato creado',
            data:createNewEntity
        })
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updateEntity = async( req,res) => {
    try {

        const body = req.body; 
        const id = req.params.id
        const updateEntity = await Entity.update({
    
            desc_entity:'gsgsgsd',
            ip_entity:122134,
            image:'ggdsgsdgsd'
        },{where:{id:id}})

        const updateEntityConfig = await EntityConfig.update({
            color:'green'
        }, {where:{id:id}})

        res.status(200).json({
            msg:'Dato actualizado',
            data:{updateEntity,updateEntityConfig}
        })
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteEntity = async(req,res)=>{
    
    try {
        const id = req.params.id;
        const results = await Entity.destroy({
            where: {
              id: id,
            },
            cascade: true,
            include: [{
              model: EntityConfig,
              cascade: true,
            }],
          });

          res.status(200).json({
            msg:'Dato eliminado',
            data:results
        })
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

const getAll = async(req,res)=> {
    try {
        
        const entities = await Entity.findAll({
            order: [["id", "ASC"]],
            include: [ 
                {
                  model: EntityConfig ,
                },
              ],
        });
        res.status(200).json({
            msg:'Datos obtenidos',
            data:entities
        })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getOne = async(req,res)=> {
    try {
        const id = req.params.id;
        const entity = await Entity.findOne({
            include: [ 
                {
                  model: EntityConfig ,
                },
              ],
        }, {where:{id:id}});
        res.status(200).json({
            msg:'Dato obtenido',
            data:entity
        })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


module.exports = {
    createEntity,updateEntity,deleteEntity,getAll,getOne
}