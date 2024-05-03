let express = require('express'); 
let router = express.Router(); 

const {createGroupCorreos,deleteGroupCorreos,getAllGroupsCorreos,getOneGroupCorreos,updateGroupCorreos } = require('../controllers/groupsCorreosController');

router.post('/createGroupCorreos', createGroupCorreos);
router.get('/getAllGroupsCorreos', getAllGroupsCorreos);
router.get('/getOneGroupCorreos/:id', getOneGroupCorreos);
router.delete('/deleteGroupCorreos/:id', deleteGroupCorreos);
router.put('/updateGroupCorreos:/id', updateGroupCorreos);

module.exports = router;