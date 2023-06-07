let express = require('express'); 
let router = express.Router(); 
const {token} = require('../midlewares/token');

const { createRol,getAllRoles,getOneRol,updateRol,deleteRol } = require('../controllers/rolesController');

router.get('/getAll', getAllRoles);
router.get('/getOne/:id',getOneRol);
router.post('/create', createRol);
router.put('/update/:id', updateRol);
router.delete('/delete/:id', deleteRol);


module.exports = router;