const express = require('express');
const router = express.Router();
const dogController = require('../controllers/dogController');
const logController = require('../controllers/logController');

router.get('/profil-de-dog', dogController.dogProfilView)

module.exports = router;