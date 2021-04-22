const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const logController = require('../controllers/logController');


// views //
router.get('/accueil', logController.loggedIn, usersController.homeView)

router.get('/autour-de-moi', logController.loggedIn, usersController.localiseView, usersController.maps)

router.get('/balades', logController.loggedIn, usersController.walksView)

router.get('/profil', logController.loggedIn, usersController.profilView)


// profil //
router.get('/update-profil', usersController.updateProfilView)

// log //

router.get('/logOut', logController.logOut)

module.exports = router;