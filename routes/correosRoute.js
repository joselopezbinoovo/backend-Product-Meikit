let express = require('express'); 
let router = express.Router(); 

const {createCorreos,deleteCorreos,getAllCorreos,getOneCorreos,updateCorreos  } = require('../controllers/correosController');

router.post('/createCorreo', createCorreos);
router.get('/getAllCorreos', getAllCorreos);
router.get('/getOneCorreos/:id', getOneCorreos);
router.delete('/deleteCorreos/:id', deleteCorreos);
router.put('/updateCorreos:/id', updateCorreos);

module.exports = router;