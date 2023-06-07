let express = require('express'); 
let router = express.Router(); 

const { createUser,getAllUsers,getOneUser,updateUser,deleteUser } = require('../controllers/usersController');
const { roleManagement } = require('../midlewares/roleManagement');
const {token} = require('../midlewares/token');
const fileUpload = require('../config/multer'); 


router.get('/getAll',token,roleManagement,getAllUsers);
router.get('/getOne/:id',token,roleManagement,getOneUser);
router.post('/create/:id_role',token,roleManagement,fileUpload('../assets/users'), createUser);
router.put('/update/:id',token,roleManagement,fileUpload('../assets/users'), updateUser);
router.delete('/delete/:id',token,roleManagement, deleteUser);

module.exports = router;