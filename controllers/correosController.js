const Correos = require('../models/Correos');

const getAllCorreos = async(req,res)=> {

    try {

        const correos = await Correos.findAll();

        if ( !correos){
            return res.status(400).json({
                msg:'No hay correos'
            })
        }

        return res.status(200).json({
            msg:'Correos obtenidos con exitos!',
            data:correos
        })
        
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}

const getOneCorreos= async(req,res)=> {

    try {

        const id = req.params.id; 

        const correo = await Correos.findOne({ where:{id:id}})

        if ( !correo){
            return res.status(400).json({
                msg:'No se ha encontrado el correo'
            })
        }
        
        return res.status(200).json({
            msg:'Correo obtenido con exitos!',
            data:correo
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}


const updateCorreos = async(req,res)=> {

    try {

        const id = req.params.id; 
        const body = req.body; 

        const correoUpdate = await Correos.update({

            email:body.email,
            id_groupCorreos:body.id_groupCorreos,
        },{where:{id:id}})
        

        if ( !correoUpdate){
            return res.status(400).json({
                msg:'No se ha encontrado el correo a actualizar'
            })
        }
        
        return res.status(200).json({
            msg:'Correo actualizado con exitos!',
            data:correoUpdate
        })

    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}

const deleteCorreos = async(req,res)=> {

    try {
        const id = req.params.id; 

        const correoDelete = await Correos.destroy({where:{id:id}}); 



        if ( !correoDelete){
            return res.status(400).json({
                msg:'No se ha encontrado el correo a borrar'
            })
        }
        
        return res.status(200).json({
            msg:'Correo borrado con exitos!',
            data:correoDelete
        })
        
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}


const createCorreos = async(req,res)=> {

    try {

        const body = req.body; 

        const createCorreo = await Correos.create({
            email:body.email,
            id_groupCorreos:body.id_groupCorreos,
        })
            
        return res.status(200).json({
            msg:'Correo creado con exitos!',
            data:createCorreo
        })

    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}





module.exports={getAllCorreos,getOneCorreos,updateCorreos,deleteCorreos,createCorreos}