const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/viewsController');
const logController = require('../controllers/logController');

router.get('/accueil', logController.loggedIn, viewsController.home)
router.get('/autour-de-moi', logController.loggedIn, viewsController.localise)
router.get('/balades', logController.loggedIn, viewsController.walks)
router.get('/profil', logController.loggedIn, viewsController.profil)

//user

router.get('/user-update', logController.loggedIn, viewsController.updateUser)

//dog
router.get('/dog-profil', logController.loggedIn, viewsController.getDog)
router.get('/dog-add', viewsController.createDog)
router.get('/dog-update', viewsController.updateDog)

module.exports = router;