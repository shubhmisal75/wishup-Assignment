const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

//--------------------------------------------------------------//
router.post('/user',userController.createUser)
router.get('/getusers',userController.getusers)
router.get('/user/:id',userController.getuserbyid)
router.put('/user/:id',userController.updateuser)
router.delete('/user/:id',userController.deleteuser)


module.exports = router;

