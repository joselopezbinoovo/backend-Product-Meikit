const User = require('../models/UsersModel'); 
const Roles = require('../models/RolesModel');


const roleManagement = async ( req, res , next)=>{

    try{
      const  id  = req.params.id_role
      const user = await User.findOne({
        where: {
            id_role:id
        },
        include: [ 
            {
              model: Roles ,
            },
          ],
      });
      const admin = "ADMIN"; 
      if(user.Role.dataValues.role_name != admin) 
      return res.status(401).json('No eres admin');
      next()
    }catch (error) {
      res.status(500).json({
        ok:false,
        msg:error 
      })
    }
  }


module.exports={ 
    roleManagement
}