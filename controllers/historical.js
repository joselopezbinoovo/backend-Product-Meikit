const Historical = require('../models/HistoricalModel'); 
const variables = require('../models/VariablesModel');
const { Op } = require('sequelize');
const { parse } = require('date-fns');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


const createHistorical = async( req,res) => {
    try {

        const body = req.body; 
        const HistoricalCreate = await Historical.bulkCreate(body,{
          include: [variables]
      })
        res.status(200).json({
            msg:'Ok',
            data:HistoricalCreate
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getAll = async( req,res) => {
  try {

      const getALL = await Historical.findAll()
      res.status(200).json({
          msg:'Ok',
          data:getALL
      })
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
}


const createAutoHistorical = async(req,res)=> {

    try {

        const VariablesSelected = await variables.findAll({
            where:{selected:true}
        })


        res.status(200).json({
            msg:'todo ok',
            VariablesSelected
        })
        
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}

const getAllbyRangeDate = async (req, res) => {
    try {
        const { dateStart, dateEnd, desc_variable } = req.query;

        if (!dateStart && !dateEnd && !desc_variable) {
            return res.status(400).json({ message: 'Debes proporcionar al menos una fecha o una variable de descripción' });
        }

        let startDate = null;
        let endDate = null;

        // Convierte las cadenas de texto en objetos Date si están definidas
        if (dateStart) {
            startDate = parse(dateStart, 'dd/MM/yyyy HH:mm:ss', new Date());
            if (!startDate) {
                return res.status(400).json({ message: 'La fecha de inicio proporcionada no es válida' });
            }
        }

        if (dateEnd) {
            endDate = parse(dateEnd, 'dd/MM/yyyy HH:mm:ss', new Date());
            if (!endDate) {
                return res.status(400).json({ message: 'La fecha de fin proporcionada no es válida' });
            }
        }

        let queryOptions = {};

        // Construye la consulta según las fechas y la variable de descripción proporcionadas
        if (startDate && endDate && desc_variable) {
            queryOptions = {
                where: {
                    date: {
                        [Op.between]: [startDate, endDate]
                    },
                    desc_variable: desc_variable
                }
            };
        } else if (startDate && desc_variable) {
            queryOptions = {
                where: {
                    date: {
                        [Op.gte]: startDate
                    },
                    desc_variable: desc_variable
                }
            };
        } else if (endDate && desc_variable) {
            queryOptions = {
                where: {
                    date: {
                        [Op.lte]: endDate
                    },
                    desc_variable: desc_variable
                }
            };
        } else if (desc_variable) {
            queryOptions = {
                where: {
                    desc_variable: desc_variable
                }
            };
        } else if (startDate && endDate) {
            queryOptions = {
                where: {
                    date: {
                        [Op.between]: [startDate, endDate]
                    }
                }
            };
        } else if (startDate) {
            queryOptions = {
                where: {
                    date: {
                        [Op.gte]: startDate
                    }
                }
            };
        } else if (endDate) {
            queryOptions = {
                where: {
                    date: {
                        [Op.lte]: endDate
                    }
                }
            };
        }

        // Realiza la consulta utilizando los parámetros construidos
        const historicos = await Historical.findAll(queryOptions);

        const csvWriter = createCsvWriter({
            path:'historicos.csv',
            header:[
                {id:'id', title:'id'},
                {id:'desc_variable',title:'desc_variable'},
                {id:'plcValue',title:'plcValue'},
                {id:'date', title:'date'}
            ]
        })


        csvWriter.writeRecords(historicos).then(()=> {
            console.log('Hecho');
        })


        res.status(200).json({
            msg: 'Fechas obtenidas y exportadas a CSV',
            historicos: historicos
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
module.exports={createHistorical,getAll,createAutoHistorical,getAllbyRangeDate}