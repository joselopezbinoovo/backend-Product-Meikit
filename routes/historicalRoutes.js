let express = require('express'); 
let router = express.Router(); 

const {createHistorical,getAll} = require('../controllers/historical'); 

router.post('/create',createHistorical);
router.get('/getAll',getAll);
module.exports = router;