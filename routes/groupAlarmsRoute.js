let express = require('express'); 
let router = express.Router(); 

const {createGroupAlarm,deleteGroupAlarm,getAllGroupsAlarm,getOneGroupAlarm,updateGroupAlarm  } = require('../controllers/groupsAlarmasController');

router.post('/createGroupAlarm',createGroupAlarm);
router.get('/getAllGroupsAlarm',getAllGroupsAlarm );
router.get('/getOneGroupAlarm/:id',getOneGroupAlarm );
router.delete('/deleteGroupAlarm/:id',deleteGroupAlarm );
router.put('/updateGroupAlarm:/id',updateGroupAlarm );

module.exports = router;