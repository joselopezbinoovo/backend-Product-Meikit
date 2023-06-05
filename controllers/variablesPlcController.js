/* const ValorPLC  = require( '../models/ValorPLCModel'); 
const Variable = require('../models/VariablesModel');



const getAll = async(req,res) => {

    try {
        
        const variablesPLC  = await ValorPLC.findAll({ 
            order: [["id", "ASC"]],
        include: [ 
            {
              model: Variable ,
            },
          ],})
          res.status(200).json({
            msg:'Usuario Creado',
            data:variablesPLC
        })

    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}
const getOne = async(req,res) => {

    try {
        const id = req.params.id;
        const variablePlc = await VariablePLC.findOne({
            include: [ 
                {
                  model:Variable ,
                },
              ],
        }, {where:{id:id}});
        res.status(200).json({
            msg:'Dato obtenido',
            data:variablePlc
        })

    } catch (error) {
        
    }
}
const deleteVariablePLC = async(req,res) => {
    try {

        
        
    } catch (error) {
        
    }
}
const updateVaraiblePLC = async(req,res) => {

    try {
        
    } catch (error) {
        
    }
}
const createVariablePLC = async(req,res) => {

    try {
        
    } catch (error) {
        
    }
}

module.exports={ 
    getAll,getOne,deleteVariablePLC,updateVaraiblePLC,createVariablePLC
} */