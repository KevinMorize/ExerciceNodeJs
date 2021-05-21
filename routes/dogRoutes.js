const express = require('express');
const router = express.Router();
const dogController = require('../controllers/dogController');
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

router.post('/dog-add', logController.loggedIn, upload.single('image'),dogController.createDog)

router.post('/dog-update', upload.single('image'), dogController.updateDog)

router.get('/dog-delete', dogController.deleteDog) 


module.exports = router;