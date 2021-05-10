const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// user-login //
router.get('/', authController.login)
router.post('/login', authController.login)


// user-register //
router.get('/inscription', authController.registerView)
router.post('/inscription', authController.register)



module.exports = router;