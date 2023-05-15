let express = require('express'); 
let router = express.Router(); 

const {  createEntity,updateEntity,deleteEntity,getAll,getOne} = require('../controllers/entityController'); 


router.get('/getAll', getAll);
router.get('/getOne/:id', getOne);
router.post('/create', createEntity);
router.put('/update/:id',updateEntity);
router.delete('/delete/:id', deleteEntity);
module.exports = router;