
const GruposCorreos = require('../models/GroupCorreosModel')

const getAllGroupsCorreos = async(req,res)=> {

    try {
        
        const gruposCorreos = await GruposCorreos.findAll();

        if ( !gruposCorreos){
            return res.status(400).json({
                msg:'No hay grupos de correos'
            })
        }

        return res.status(200).json({
            msg:'Grupos de correos obtenidos con exitos!',
            data:gruposCorreos
        })

    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}

const getOneGroupCorreos= async(req,res)=> {

    try {
        
        const id = req.params.id; 

        const grupoCorreo = await GruposCorreos.findOne({ where:{id:id}})

        if ( !grupoCorreo){
            return res.status(400).json({
                msg:'No se ha encontrado el grupo de correos'
            })
        }
        
        return res.status(200).json({
            msg:'Grupo de correo obtenido con exitos!',
            data:grupoCorreo
        })
        
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}


const updateGroupCorreos = async(req,res)=> {

    try {
        
        const id = req.params.id; 
        const body = req.body; 

        const grupoCorreoUpdate = await GruposCorreos.update({
            name:body.name,
        },{where:{id:id}})
        

        if ( !grupoCorreoUpdate){
            return res.status(400).json({
                msg:'No se ha encontrado el grupo de correos a actualizar'
            })
        }
        
        return res.status(200).json({
            msg:'Grupo de correoa actualizado con exitos!',
            data:grupoCorreoUpdate
        })


    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}

const deleteGroupCorreos = async(req,res)=> {

    try {
        const id = req.params.id; 

        const gurpoCorreoDelete = await GruposCorreos.destroy({where:{id:id}}); 



        if ( !gurpoCorreoDelete){
            return res.status(400).json({
                msg:'No se ha encontrado el grupo de correos a borrar'
            })
        }
        
        return res.status(200).json({
            msg:'Grupo de Correos borrado con exitos!',
            data:gurpoCorreoDelete
        })
        
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}


const createGroupCorreos = async(req,res)=> {

    try {
        const body = req.body; 

        const createGrupoCorreo = await Correos.create({
            name:body.name,
        })
            
        return res.status(200).json({
            msg:'Grupo de correos creado con exitos!',
            data:createGrupoCorreo
        })
        
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}





module.exports={getAllGroupsCorreos,getOneGroupCorreos,updateGroupCorreos,deleteGroupCorreos,createGroupCorreos}