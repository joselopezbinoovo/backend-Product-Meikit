let express = require('express'); 
let router = express.Router(); 
const fileUpload = require('../config/multer'); 
const {token} = require('../midlewares/token');

const {  createEntity,updateEntity,deleteEntity,getAll,getOne, changeState,getAllWhereVariableEntityNull,getAllOnlyEntity,getAllEntitiesMonitoring} = require('../controllers/entityController'); 


router.get('/getAll',getAll);
router.get('/getAllEntityNull',getAllWhereVariableEntityNull);
router.get('/getAllOnlyEntity',getAllOnlyEntity);
router.get('/getAllMonitoring',getAllEntitiesMonitoring);

router.get('/getOne/:id',getOne);
router.post('/create',fileUpload('./public/entity/'),createEntity);
router.put('/update/:id',fileUpload('./public/entity/'),updateEntity);
router.put('/updateState/:id', changeState)
router.delete('/delete/:id',deleteEntity);
module.exports = router;