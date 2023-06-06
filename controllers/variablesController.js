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
            imagen: body.imagen,
            unidad: body.unidad,
            id_entity: body.id_entity,
            ValoresPLC: {
                variable_data: body.ValoresPLC.variable_data,
                variable_name: body.ValoresPLC.variable_name,
                connection_string: body.ValoresPLC.connection_string
            }
        }, {
            include: [{
                model: ValorPLC,
                cascade: true,

            }, ],
        })

        res.status(200).json({
            msg: 'Dato creado',
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
            imagen: body.imagen,
            unidad: body.unidad,
            id_entity: body.id_entity,
        }, {
            where: {
                id: id  
            }
        })
        const valorPLCUpdate  = await ValorPLC.update({
            variable_data: body.variable_data,
            variable_name: body.variable_name,
            connection_string: body.connection_string,
        }, {
            where: {
                id_variable: id  
            }
        })
        res.status(200).json({
            msg: 'Dato actualizado',
            variableUpdata,valorPLCUpdate
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


module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleting
}