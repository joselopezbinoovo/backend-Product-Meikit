let express = require('express'); 
let router = express.Router(); 

const { createUser,getAllUsers,getOneUser,updateUser,deleteUser } = require('../controllers/usersController');
const { roleManagement } = require('../midlewares/roleManagement');
const {token} = require('../midlewares/token');
const fileUpload = require('../config/multer'); 


router.get('/getAll',getAllUsers);
router.get('/getOne/:id',token,roleManagement,getOneUser);
router.post('/create',fileUpload('./public/users/'), createUser);
router.put('/update/:id',fileUpload('./public/users/'), updateUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;    