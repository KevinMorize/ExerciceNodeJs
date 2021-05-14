const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const dogController = require('../controllers/dogController');
const logController = require('../controllers/logController');


// views //
router.get('/accueil', logController.loggedIn, usersController.homeView, dogController.getDogProfil)

router.get('/autour-de-moi', logController.loggedIn, usersController.localiseView)

router.get('/balades', logController.loggedIn, usersController.walksView)

router.get('/profil', logController.loggedIn, usersController.profilView)


// update //
router.get('/update-profil', logController.loggedIn, usersController.getUpdateProfil)
router.post('/update-profil', logController.loggedIn, usersController.updateProfil)

//delete
router.get('/delete-profil', logController.loggedIn, usersController.deleteProfil) 

// log //
router.get('/logOut', logController.logOut)

module.exports = router;