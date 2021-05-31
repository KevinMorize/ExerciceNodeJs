const express = require('express');
const router = express.Router();
const walkController = require('../controllers/walkController');
const logController = require('../controllers/logController');

router.post('/walk-create', logController.loggedIn, walkController.createWalk);

module.exports = router;