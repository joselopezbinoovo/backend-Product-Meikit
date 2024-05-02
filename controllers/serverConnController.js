const serverConnection = require('../models/ServerConnectionModel');

const creacteServerConn = async (req, res) => {
    try {
        const body = req.body;

        // Busca el último registro de serverConnection
        const lastServerConnection = await serverConnection.findOne({
            order: [['id', 'DESC']] // Ordena por ID en orden descendente para obtener el último registro
        });

        let nextSocketTag = "push1"; // Valor predeterminado si no hay registros en la base de datos

        // Si existe un registro previo, incrementa el número de push
        if (lastServerConnection) {
            const lastSocketTag = lastServerConnection.socketTag;
            const lastPushNumber = parseInt(lastSocketTag.replace("push", "")); // Extrae el número de push
            nextSocketTag = "push" + (lastPushNumber + 1); // Incrementa el número de push
        }

        // Asigna el nuevo socketTag al cuerpo de la solicitud
        body.socketTag = nextSocketTag;

        // Crea el nuevo serverConnection
        const createServer = await serverConnection.create(body);

        res.status(200).json({
            ok: true,
            msg: 'Conexión al servidor creada con éxito',
            data: createServer
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



const getAllServerConntions = async (req,res) => {
    try {
        
        const getAllServersConn = await serverConnection.findAll(); 

        if ( !getAllServersConn){
            res.status(400).json({
                ok:false,
                msg:'No se encontraron servidores'
            })
        }

        res.status(200).json({
            msg:'Servidores obtenidos con exito',
            data:getAllServersConn
        })

    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}


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

const deleteServerConn = async (req,res)=>{
    try {
        
        const id = req.params.id;

        const deleteServer = await serverConnection.destroy({where:{id:id}}); 

        if ( !deleteServer){
            res.status(400).json({
                msg:'No se ha encontrado servidor para borrar'
            })
        }

        res.status(200).json({
            msg:'Conexion borrada con exito',
            data:deleteServer
        })
    } catch (error) {
        
    }
}

const updateServerConn = async (req,res)=>{
    try {
        
        const id = req.params.id;
        const body = req.body; 
        const updateServer = await serverConnection.update({
            connectionString:body.connectionString,
        },{where:{id:id}}); 
        
        if ( !updateServer){
            res.status(400).json({
                msg:'No se ha encontrado servidor para borrar'
            })
        }

        res.status(200).json({
            msg:'Conexion actualizada con exito',
            data:updateServer
        })
    } catch (error) {
        
    }
}


module.exports = { getAllServerConn,creacteServerConn,getAllServerConntions,deleteServerConn,updateServerConn}