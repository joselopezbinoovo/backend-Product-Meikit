const User = require('../models/UsersModel');
const Roles = require('../models/RolesModel');

const bcrypt = require('bcrypt');
const fs = require('fs');
const DIR = './';

const createUser = async(req,res)=> {
    try {

        const body = req.body;
        var imgUrl = ""; 

        if ( req.file) var imgUrl = `../assets/users/${req.file.filename}`;
        body.image = imgUrl;

        let password = bcrypt.hashSync(body.password, 10);
        const createUser = await User.create({
            name:body.name,
            email:body.email,
            password:password,
            image:body.image,
            id_role: body.id_role, 
        })
        res.status(200).json({
            msg:'Usuario Creado',
            data:createUser
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updateUser = async(req,res)=> {
    try {

        const body = req.body;
        const id = req.params.id;

        if ( req.file) var imgUrl = `../assets/users/${req.file.filename}`;
        body.image = imgUrl;

        const user = await User.findOne({ where: { id: req.params.id}}); 
        const userFotoInfo = user.image;

    
            if ( !(userFotoInfo === undefined || userFotoInfo === null || userFotoInfo?.length === 0)){
                fs.unlinkSync(DIR + userFotoInfo)
            }

        let password = bcrypt.hashSync(req.body.password, 10);
        const userUpdate = await User.update({
            name:body.name,
            email:body.email,
            password:password,
            image:body.image,
            id_role: body.id_role, 
    
        }, {where:{id:id}})
  
        res.status(200).json({
            ok:true,
            msg:'Usuario Actualizado',
            data:userUpdate
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteUser = async(req,res)=> {
    try {
        const id = req.params.id; 
        const userDelete = await User.destroy({where:{id:id}}); 

        res.status(200).json({
            ok:true,
            msg:'Usuario Borrado',
            data:userDelete
        })


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}



const getOneUser = async(req,res)=> {
    try {

        const id = req.params.id
        const oneUser= await User.findByPk(id, {
            include: [ 
              {
                model: Roles ,
              },
            ],
          });
            
    res.status(200).json({
        msg:'Dato Obtenido',
        data:oneUser
    })
        
    } catch (error) {
        
    }
}


const getAllUsers = async(req,res)=> {
    try {

        const users = await User.findAll({ include:Roles  });

        res.status(200).json({
            msg:'Usuario Creado',
            data:users
        })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { createUser,getAllUsers,getOneUser,updateUser,deleteUser}



