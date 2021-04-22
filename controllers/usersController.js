const usersModel = require('../models/usersModel')

// views //
exports.homeView = (req, res) => {
    usersModel.homeView(req, res)
}

exports.localiseView = (req, res) => {
    usersModel.localiseView(req, res)
}

exports.walksView = (req, res) => {
    usersModel.walksView(req, res)
}

// profil //

exports.profilView = async (req, res) => {
    usersModel.profilView(req, res)
}

exports.updateProfilView = (req, res) => {
    usersModel.updateProfilView(req, res)
}

// localise //

exports.maps = async (req, res) => {
    mapsModel.maps(req, res)
}


 

