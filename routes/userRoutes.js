let express = require('express'); 
let router = express.Router(); 

const { createUser,getAllUsers,getOneUser,updateUser,deleteUser } = require('../controllers/usersController');

router.get('/getAll', getAllUsers);
router.get('/getOne/:id',getOneUser);
router.post('/create', createUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);


module.exports = router;