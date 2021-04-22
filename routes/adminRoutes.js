const express = require('express');
const router = express.Router();
const adminController = require ('../controllers/adminController');
const logController = require ('../controllers/logController');

router.get('/home-admin', adminController.homeView)

router.get('/add-user', adminController.addUserView)
router.post('/add-user', adminController.addUser)

router.get('/update-user', adminController.updateUserView)
router.post('/update-user', adminController.updateUser)

router.get('/delete-user', adminController.deleteUser) 

router.get('/logOut', logController.logOut)

module.exports = router;