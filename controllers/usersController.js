const { use } = require('passport')
const usersModel = require('../models/usersModel')

// views //
exports.homeView = (req, res) => {
    res.render('../views/users/home', {
        title: "acceuil"
    })
}
exports.localiseView = (req, res) => {
        res.render('../views/users/localise', {
            title: "autour de moi"
        })
}
exports.walksView = (req, res) => {
    res.render('../views/users/walks', {
        title: "mes balades"
    })
}
exports.profilView = async (req, res) => {
    usersModel.userProfil(req, res)
}
exports.updateProfilView = (req, res) => {
    usersModel.updateProfilView(req, res)
}

// edit profil //
exports.updateProfil = (req, res) => {
    usersModel.updateUser(req, res)
}

// edit dogs //
exports.addDogView = (req, res) => {
    res.render('../views/users/addDog', {title: "ajouter un chien"})
}
exports.addDog = (req, res) => {
    usersModel.addDog(req, res)
}
exports.deleteDog = (req, res) => {
    usersModel.deleteDog(req, res)
}

// localise //

// exports.maps = async (req, res) => {
//     mapsModel.maps(req, res)
// }


 

