const express = require('express');
const router = express.Router();
const subscribution = require('../controllers/subscribution')
const userController = require("../controllers/userController")
//--------------------------------------------------------------//

router.post('/user/:user_name',userController.user)
 router.post('/subscribution',subscribution.subscribePlan)
 router.get('/plan/:user_name',subscribution.getsubscriptions)

module.exports = router;

