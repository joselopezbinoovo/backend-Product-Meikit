let express = require('express'); 
let router = express.Router(); 
const fileUpload = require('../config/multer'); 

const {  createEntity,updateEntity,deleteEntity,getAll,getOne} = require('../controllers/entityController'); 


router.get('/getAll',getAll);
router.get('/getOne/:id',getOne);
router.post('/create',fileUpload('../assets/entities'),createEntity);
router.put('/update/:id',fileUpload('../assets/entities'),updateEntity);
router.delete('/delete/:id',deleteEntity);
module.exports = router;