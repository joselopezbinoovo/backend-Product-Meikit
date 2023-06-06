let express = require('express'); 
let router = express.Router(); 

const { createUser,getAllUsers,getOneUser,updateUser,deleteUser } = require('../controllers/usersController');

const fileUpload = require('../config/multer'); 


router.get('/getAll', getAllUsers);
router.get('/getOne/:id',getOneUser);
router.post('/create',fileUpload('../assets/users'), createUser);
router.put('/update/:id',fileUpload('../assets/users'), updateUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;