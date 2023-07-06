const Entity = require('../models/EntityModel'); 
const EntityConfig = require('../models/EntityConfigModel');
const Variable = require('../models/VariablesModel')
const fs = require('fs');
const valorPLC = require('../models/ValorPLCModel');
const DIR = './public/entity/';



const createEntity = async( req,res) => {
    try {

        const body = req.body; 
        var imgUrl = "";

        console.log(req);
        if (req.file) var imgUrl = `${req.file.filename}`;
        body.image = imgUrl;

        const createNewEntity = await Entity.create({
            desc_entity:body.desc_entity,
            ip_entity:body.ip_entity,
            image:body.image,
            state:body.state,
            EntityConfig:{
                textColor:body.entityConfig.textColor,
                bgColor:body.entityConfig.bgColor
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

        const updateEntity = await Entity.update({

            desc_entity:body.desc_entity,
            ip_entity:body.ip_entity,
            image:body.image,
            state:body.state
        },{where:{id:id}})

        const updateEntityConfig = await EntityConfig.update({
            textColor:body.textColor,
            bgColor:body.bgColor
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

const getOne = async(req,res)=> {
    try {
        const id = req.params.id;

        console.log(id)
       // const entity = await Entity.findOne( {include: EntityConfig }, {where:{id:id}});
        const entity = await Entity.findByPk(id, {
            include: [ 
              {
                model: EntityConfig ,
              },
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

    res.status(200).json({
        msg:'Updated State',
        data:updateEntity
    })
}catch (error) {
    return res.status(500).json({ message: error.message });
}
}

module.exports = {
    createEntity,updateEntity,deleteEntity,getAll,getOne,changeState
}