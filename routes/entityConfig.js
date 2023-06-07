let express = require('express'); 
let router = express.Router(); 
const {token} = require('../midlewares/token');

const {  getAllEntityConfig,getOneEntityConfig,} = require('../controllers/entityConfigController'); 

router.get('/getAll',token ,getAllEntityConfig);
router.get('/getOne/:id',token, getOneEntityConfig);

module.exports = router;