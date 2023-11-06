const Historical = require('../models/HistoricalModel'); 
const variables = require('../models/VariablesModel');

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
        
    }
}




module.exports={createHistorical,getAll,createAutoHistorical}