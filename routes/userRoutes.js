const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const logController = require('../controllers/logController');

var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/tmp/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });

//update
router.post('/user-update', logController.loggedIn, upload.array('image') ,userController.updateUser)

//delete
router.get('/user-delete', logController.loggedIn,userController.deleteUser) 

//log
router.get('/logOut', logController.logOut)

module.exports = router;