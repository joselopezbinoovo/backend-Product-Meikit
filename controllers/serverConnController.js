const serverConnection = require('../models/ServerConnectionModel');

const getAllServerConn = async (req,res) => {

        try {
    
            const result = await serverConnection.findAll() 
            const array = []; 
            for(const [key, value] of Object.entries(result)){
                array.push(value.dataValues)
              }            return array
                       
        } catch (error) {
            console.log(error);
            //return res.status(500).json({ message: error.message });
        }
}


module.exports = { getAllServerConn}