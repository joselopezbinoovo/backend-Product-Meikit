let express = require('express'); 
let router = express.Router(); 

const {createHistorical,getAll,getAllbyRangeDate} = require('../controllers/historical'); 

router.post('/create',createHistorical);
router.get('/getAll',getAll);
router.get('/getAllbyRangeDate',getAllbyRangeDate);


module.exports = router;