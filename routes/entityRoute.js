let express = require('express'); 
let router = express.Router(); 
const fileUpload = require('../config/multer'); 
const {token} = require('../midlewares/token');

const {  createEntity,updateEntity,deleteEntity,getAll,getOne} = require('../controllers/entityController'); 


router.get('/getAll',getAll);
router.get('/getOne/:id',token,getOne);
router.post('/create',token,fileUpload('../assets/entities'),createEntity);
router.put('/update/:id',fileUpload('../assets/entities'),updateEntity);
router.delete('/delete/:id',token,deleteEntity);
module.exports = router;