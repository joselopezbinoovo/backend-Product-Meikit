let express = require('express'); 
let router = express.Router(); 

const {  getAllEntityConfig,getOneEntityConfig,} = require('../controllers/entityConfigController'); 

router.get('/getAll', getAllEntityConfig);
router.get('/getOne/:id', getOneEntityConfig);

module.exports = router;