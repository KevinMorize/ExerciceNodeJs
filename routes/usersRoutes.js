const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const logController = require('../controllers/logController');


// views //
router.get('/accueil', logController.loggedIn, usersController.homeView)
router.get('/autour-de-moi', logController.loggedIn, usersController.localiseView)
router.get('/balades', logController.loggedIn, usersController.walksView)
router.get('/profil', logController.loggedIn, usersController.profilView)


// profil //
router.get('/edit-profil', usersController.updateProfilView)
router.post('/edit-profil', usersController.updateProfil)

// log //
router.get('/logOut', logController.logOut)

// edit dogs //
router.get('/add-dog', logController.loggedIn, usersController.addDogView)
router.post('/add-dog', logController.loggedIn, usersController.addDog)
router.get('/delete-dog', usersController.deleteDog)

module.exports = router;