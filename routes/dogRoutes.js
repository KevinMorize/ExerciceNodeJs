const express = require('express');
const router = express.Router();
const dogController = require('../controllers/dogController');
const logController = require('../controllers/logController');

router.get('/profil-de-dog', dogController.dogProfilView)

// add-dog //
router.get('/add-dog', logController.loggedIn, dogController.addDogView)
router.post('/add-dog', logController.loggedIn, dogController.addDog)

// delete-dog //
router.get('/delete-dog', dogController.deleteDog)

module.exports = router;