const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const logController = require('../controllers/logController');

//update
router.post('/user-update', logController.loggedIn, userController.updateUser)

//delete
router.get('/user-delete', logController.loggedIn, userController.deleteUser) 

//log
router.get('/logOut', logController.logOut)

module.exports = router;