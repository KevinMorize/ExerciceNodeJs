const express = require('express');
const router = express.Router();
const dogController = require('../controllers/dogController');
const logController = require('../controllers/logController');

router.get('/dog-profil', dogController.getDogProfil)

router.get('/add-dog', logController.loggedIn, dogController.getCreateDog)
router.post('/add-dog', logController.loggedIn, dogController.createDog)

router.get('/update-dog', dogController.getUpdateDog)
router.post('/update-dog', dogController.updateDog)

router.get('/delete-dog', dogController.deleteDog) 


module.exports = router;