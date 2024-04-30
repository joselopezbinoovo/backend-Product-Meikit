const Variable = require('../models/VariablesModel');
const Entity = require('../models/EntityModel');
const ValorPLC = require('../models/ValorPLCModel');



const getAll = async (req, res) => {
    try {
        const variables = await Variable.findAll({
            order: [
                ["id", "ASC"]
            ],
            include: [{
                    model: ValorPLC,
                },
                {
                    model: Entity,
                },
            ],
        })

        res.status(200).json({
            msg: 'Variables recibidas',
            data: variables
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });

    }
}

const getOne = async (req, res) => {
    try {

        const id = req.params.id;
        const variable = await Variable.findByPk(id, {
            include: [{
                    model: ValorPLC,
                },
                {
                    model: Entity,
                },
            ],
        }, {
            where: {
                id: id
            }
        });

        res.status(200).json({
            msg: 'Variable Obtenida',
            data: variable
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });

    }

}

const create = async (req, res) => {
    try {

        const body = req.body;

        const createNewVariable = await Variable.create({
            des_variable: body.des_variable,
            image: body.image,
            unidad: body.unidad,
            selected:body.selected,
            id_entity: body.id_entity,
            monitoring:body.monitoring,
            ValoresPLC: {
                variableString: body.ValoresPLC.variableString,
                variableName: body.ValoresPLC.variableName,
                conectionString: body.ValoresPLC.conectionString
            }
        }, {
            include: [{
                model: ValorPLC,
               // cascade: true,

            }, ],
        })

        res.status(200).json({
            msg: 'Varaible creada con exito',
            data: createNewVariable

        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

}

const update = async (req, res) => {
    try {
        const body = req.body;

        const id = req.params.id

        const variableUpdata = await Variable.update({
            des_variable: body.des_variable,
            image: body.image,
            unidad: body.unidad,
            selected:body.selected,
            id_entity: body.id_entity,
            monitoring:body.monitoring,
        }, {
            where: {
                id: id  
            }
        })
        const valorPLCUpdate  = await ValorPLC.update({
            variableString: body.ValoresPLC.variableString,
            variableName: body.ValoresPLC.variableName,
            conectionString: body.ValoresPLC.conectionString,
        }, {
            where: {
                id_variable: id  
            }
        })
        res.status(200).json({
            msg: 'Variable actualizada con exito',
            variableUpdata,valorPLCUpdate
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });

    }

}

const changeSelected = async(req,res) => {
  
  try{
    const body = req.body;
    const id = req.params.id

    const changeSelected = await Variable.update({
        selected:body.selected
    } ,{
        where: {
            id: id  
        }
    })

    res.status(200).json({
        msg: 'Dato actualizado',
        data:changeSelected
    })
  } catch (error) {
    return res.status(500).json({
        message: error.message
    });

}
    
}

const deleting = async (req, res) => {

    try {
        const id = req.params.id;
        const results = await Variable.destroy({
            where: {
                id: id,
            },
            include: [{
                model: Entity,
                cascade: true,
            }],
        });

        res.status(200).json({
            msg: 'Variable eliminada',
            data: results
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });

    }

}

const updateBulking = async(req,res)=> {

    try {
        const body = req.body; 

        const updateBulkingVariable = await Variable.bulkCreate(body, { updateOnDuplicate: ['monitoring'] } )

        res.status(200).json({
            msg: 'Variable eliminada',
            data:updateBulkingVariable})


    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

}




module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleting,
    changeSelected,
    updateBulking
}