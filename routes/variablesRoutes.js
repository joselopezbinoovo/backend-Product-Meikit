let express = require('express'); 
let router = express.Router(); 
const { create,deleting,getAll,getOne,update,changeSelected} = require('../controllers/variablesController')
const {token} = require('../midlewares/token');



router.get('/getAll', getAll);
router.get('/getOne/:id',token,getOne);
router.post('/create', create);
router.put('/update/:id',token, update);
router.delete('/delete/:id',deleting);
router.put('/changeSelected/:id',changeSelected)



module.exports = router;
