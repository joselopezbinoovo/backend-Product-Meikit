const GroupAlarms = require('../models/GroupAlarmsModel');

const getAllGroupsAlarm = async(req,res)=> {

    try {

        const groupsAlarms = await GroupAlarms.findAll();

        if ( !groupsAlarms){
            return res.status(400).json({
                msg:'No hay grupos de alarmas'
            })
        }

        return res.status(200).json({
            msg:'Grupos de alarmas obtenidos con exitos!',
            data:groupsAlarms
        })

        
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}

const getOneGroupAlarm= async(req,res)=> {

    try {
        const id = req.params.id; 

        const grupoAlarms = await GroupAlarms.findOne({ where:{id:id}})

        if ( !grupoAlarms){
            return res.status(400).json({
                msg:'No se ha encontrado el grupo de alarmas'
            })
        }
        
        return res.status(200).json({
            msg:'Grupo de alarmas obtenido con exitos!',
            data:grupoAlarms
        })
        
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}


const updateGroupAlarm = async(req,res)=> {

    try {
         
        const id = req.params.id; 
        const body = req.body; 

        const grupoAlarmsUpdate = await GroupAlarms.update({
            etiqueta:body.etiqueta,
            id_groupCorreos:body.id_groupCorreos
        },{where:{id:id}})
        

        if ( !grupoAlarmsUpdate){
            return res.status(400).json({
                msg:'No se ha encontrado el grupo de alarmas a actualizar'
            })
        }
        
        return res.status(200).json({
            msg:'Grupo de alarmas actualizado con exitos!',
            data:grupoAlarmsUpdate
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}

const deleteGroupAlarm = async(req,res)=> {

    try {
        const id = req.params.id; 

        const grupoAlarmsDelete= await GroupAlarms.destroy({where:{id:id}}); 



        if ( !grupoAlarmsDelete){
            return res.status(400).json({
                msg:'No se ha encontrado el grupo de alarmas a borrar'
            })
        }
        
        return res.status(200).json({
            msg:'Grupo de alarmas borrado con exitos!',
            data:grupoAlarmsDelete
        })
        
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}


const createGroupAlarm = async(req,res)=> {

    try {
        const body = req.body; 

        const createGrupoCorreo = await GroupAlarms.create({
            etiqueta:body.etiqueta,
            id_groupCorreos:body.id_groupCorreos ?  body.id_groupCorreos : null
        
        })
            
        return res.status(200).json({
            msg:'Grupo de correos creado con exitos!',
            data:createGrupoCorreo
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}





module.exports={getAllGroupsAlarm,getOneGroupAlarm,updateGroupAlarm,deleteGroupAlarm,createGroupAlarm}