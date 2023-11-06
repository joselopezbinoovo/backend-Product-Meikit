let express = require('express'); 
let router = express.Router(); 
const { create,deleting,getAll,getOne,update,changeSelected,updateBulking} = require('../controllers/variablesController')
const {token} = require('../midlewares/token');



router.get('/getAll', getAll);
router.get('/getOne/:id',token,getOne);
router.post('/create', create);
router.put('/update/:id', update);
router.put('/updateBulking',updateBulking);
router.delete('/delete/:id',deleting);
router.put('/changeSelected/:id',changeSelected)



module.exports = router;
