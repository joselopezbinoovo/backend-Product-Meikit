let express = require('express'); 
let router = express.Router(); 

const {  login} = require('../controllers/authController'); 

router.post('/login', login);
module.exports = router;