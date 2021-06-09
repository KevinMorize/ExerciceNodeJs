const express = require('express');
const router = express.Router();
const walkController = require('../controllers/walkController');
const logController = require('../controllers/logController');

router.post('/walk-create', logController.loggedIn, walkController.createWalk);

// router.post('/walk-accept', logController.loggedIn, walkController.acceptation);


module.exports = router;