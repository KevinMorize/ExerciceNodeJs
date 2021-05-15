const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');
const markController = require('../controllers/markController');

router.post('/mark', logController.loggedIn, markController.mark)

module.exports = router;