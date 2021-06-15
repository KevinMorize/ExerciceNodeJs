const express = require('express');
const router = express.Router();
const walkController = require('../controllers/walkController');
const logController = require('../controllers/logController');

router.post('/walk-create', logController.loggedIn, walkController.createWalk);

router.post('/walk-update', logController.loggedIn, walkController.updateWalk);

router.get('/walk-accept', logController.loggedIn, walkController.walkAccepted);

router.get('/walk-declined', logController.loggedIn, walkController.walkDeclined);

module.exports = router;    