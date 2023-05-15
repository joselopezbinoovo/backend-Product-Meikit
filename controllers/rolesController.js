const Role = require('../models/RolesModel');
const User = require('../models/UsersModel');

const createRol = async(req,res)=> {
    try {

        const body = req.body;
        const createRole = await Role.create({
            role_name:body.role_name,
        })
        res.status(200).json({
            msg:'Rol Creado',
            data:createRole
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updateRol = async(req,res)=> {
    try {

        const body = req.body;
        const id = req.params.id;
        const RolUpdate = await Role.update({
            role_name:body.role_name,
        }, {where:{id:id}})
  
        res.status(200).json({
            ok:true,
            msg:'Rol Actualizado',
            data:RolUpdate
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteRol = async(req,res)=> {
    try {
        const id = req.params.id; 
        const rolDelete = await Role.destroy({where:{id:id}}); 

        res.status(200).json({
            ok:true,
            msg:'Rol Borrado',
            data:rolDelete
        })


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}



const getOneRol = async(req,res)=> {
    try {

        const id = req.params.id
        const miRol= await Role.findByPk(id, {
            include: [ 
              {
                model: User ,
              },
            ],
          });
            
    res.status(200).json({
        msg:'Rol Obtenido',
        data:miRol
    })
        
    } catch (error) {
        
    }
}

const getAllRoles = async(req,res)=> {
    try {
        const roles = await Role.findAll({ include:User  });
        res.status(200).json({
            msg:'Roles Obtenidos',
            data:roles
        })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}





module.exports={ createRol,getAllRoles,getOneRol,updateRol,deleteRol }