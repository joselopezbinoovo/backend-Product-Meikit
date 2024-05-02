let express = require('express'); 
let router = express.Router(); 


const { creacteServerConn ,getAllServerConntions,deleteServerConn,updateServerConn } = require('../controllers/serverConnController');


router.post('/create', creacteServerConn);
router.get('/getAll', getAllServerConntions);
router.delete('/delete/:id', deleteServerConn);
router.put('/update/:id', updateServerConn);

module.exports = router;
 