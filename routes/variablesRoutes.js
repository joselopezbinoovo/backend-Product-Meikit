let express = require('express'); 
let router = express.Router(); 
const { create,deleting,getAll,getOne,update} = require('../controllers/variablesController')



router.get('/getAll', getAll);
router.get('/getOne/:id',getOne);
router.post('/create', create);
router.put('/update/:id', update);
router.delete('/delete/:id', deleting);



module.exports = router;
