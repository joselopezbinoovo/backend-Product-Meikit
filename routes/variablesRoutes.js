let express = require('express'); 
let router = express.Router(); 
const { create,deleting,getAll,getOne,update} = require('../controllers/variablesController')
const {token} = require('../midlewares/token');



router.get('/getAll',token, getAll);
router.get('/getOne/:id',token,getOne);
router.post('/create',token, create);
router.put('/update/:id',token, update);
router.delete('/delete/:id', token,deleting);



module.exports = router;
