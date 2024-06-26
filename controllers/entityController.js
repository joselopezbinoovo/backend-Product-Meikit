const Entity = require('../models/EntityModel'); 
const EntityConfig = require('../models/EntityConfigModel');
const Variable = require('../models/VariablesModel')
const fs = require('fs');
const valorPLC = require('../models/ValorPLCModel');
const DIR = './public/entity/';
const Sequelize = require('sequelize');
const serverConnection = require('../models/ServerConnectionModel');


const createEntity = async( req,res) => {
    try {

        const body = req.body; 
        var imgUrl = "";    

        if (req.file) var imgUrl = `${req.file.filename}`;
        body.image = imgUrl;

        console.log(body);

        const createNewEntity = await Entity.create({
            desc_entity:body.desc_entity,
            image:body.image,
            id_serverConn:body.id_serverConn,
            state:body.state,
            order:body.order,
            EntityConfig:{
                textColor:body.textColor,
                bgColor:body.bgColor
            }
        },{
            include: [{
                model: EntityConfig,
                cascade: true,

            }, ],
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
        var imgUrl = "";

        if (req.file) var imgUrl = `${req.file.filename}`;
        body.image = imgUrl;

        const entityFoto = await Entity.findOne({
            where: {
                id: id
            }
        });

        const entityFotoInfo = entityFoto.image;

        if (!(entityFotoInfo === undefined || entityFotoInfo === null || entityFotoInfo.length === 0)) {
            fs.unlinkSync(DIR + entityFotoInfo)

        }

        console.log(body);

        const updateEntity = await Entity.update({

            desc_entity:body.desc_entity,
            id_serverConn:body.id_serverConn,
            image:body.image,
            state:body.state,
            order:body.order,
        },{where:{id:id}})

        const updateEntityConfig = await EntityConfig.update({
            textColor:body.textColor,
            bgColor:body.bgColor
        }, {where:{entity_id:id}})

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

        const entity = await Entity.findByPk(id); 

        const serverConn = await serverConnection.findByPk(entity.id_serverConn, {
            include: Entity // Nombre del modelo con el que deseas incluir la relación
        });

        console.log(serverConn.Entities.length);

        if ( serverConn.Entities.length === 1){
            await serverConnection.destroy({where:{id:entity.id_serverConn}})
        }

         const results = await Entity.destroy({
            where: {
              id: id,
            },
            cascade: true,
            include: [{
              model: EntityConfig,
             // cascade: true,
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
            include: [  {
                    model:serverConnection
                },
                {
                    model: EntityConfig ,
                },
                { 
                    model:Variable,
                    include:[{

                        model:valorPLC
                }]
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

const getAllWhereVariableEntityNull = async(req,res)=> {
    try {
        
        const entities = await Entity.findAll({
            order: [["id", "ASC"]],
            include: [ 
                {
                    model:serverConnection
                },
                {
                    model: EntityConfig ,
                },
                { 
                    model:Variable,
                    include:[{

                        model:valorPLC
                }]
                },
                
              ],
              where: [
                Sequelize.where(Sequelize.col('Variables.id'), null), ]
        });
        res.status(200).json({
            msg:'Datos obtenidos',
            data:entities
        })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getAllEntitiesMonitoring = async(req,res)=> {
    try {
        
        const entities = await Entity.findAll({
            order: [["id", "ASC"]],
            include: [ 
                {
                    model:serverConnection
                },
                {
                    model: EntityConfig ,
                },
                { 
                    model:Variable,
                     where: {
            monitoring: true,
          },
                    include:[{

                        model:valorPLC
                }]
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

        console.log(id)
       // const entity = await Entity.findOne( {include: EntityConfig }, {where:{id:id}});
        const entity = await Entity.findByPk(id, {
            include: [ 
              {
                model: EntityConfig ,
              },  { 
                model:Variable,}
            ],
          });

        res.status(200).json({
            msg:'Dato obtenido',
            entity
        })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const changeState = async(req,res) => {

    try{
    const id = req.params.id; 
    const body = req.body; 
    const updateEntity = await Entity.update({
        state:body.state
    },{where:{id:id}})

    const entityState = await Entity.findOne({
        where: {
            id: id
        }
    });


    res.status(200).json({
        msg:entityState.state === true ? 'Maquina On': 'Maquina Off',
        data:updateEntity
    })
}catch (error) {
    return res.status(500).json({ message: error.message });
}
}

const getAllOnlyEntity = async(req,res)=>{
    try {
        const getEntites = await Entity.findAll(); 

        res.status(200).json({
            msg:'OK',
            data:getEntites
        })


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
const changeOrder = async(req,res)=>{
    try {
        const { id1, order1, id2, order2 } = req.body; // Obtén los valores desde el cuerpo de la solicitud
    
        // Actualiza el primer objeto con los valores del segundo
        await Entity.update({ order: order2 }, { where: { id: id1 } });
    
        // Actualiza el segundo objeto con los valores del primero
        await Entity.update({ order: order1 }, { where: { id: id2 } });
    
        res.status(200).json({
          msg: 'OK',
          data: 'Intercambio exitoso.',
        });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}


module.exports = {
createEntity,updateEntity,deleteEntity,getAll,getOne,changeState,getAllWhereVariableEntityNull,getAllOnlyEntity,getAllEntitiesMonitoring,changeOrder
}