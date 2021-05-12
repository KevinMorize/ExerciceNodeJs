const express = require('express');
const router = express.Router();
const dogController = require('../controllers/dogController');

router.get('/dog-profil', dogController.dogProfilView)

router.get('/delete-dog', dogController.deleteDog) 

module.exports = router;