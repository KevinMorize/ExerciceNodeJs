const dogModel = require('../models/dogModel.js')

exports.dogProfilView = (req, res) => {
    dogModel.dogProfilView(req, res)
}

exports.addDogView = (req, res) => {
    dogModel.addDogView(req, res)
}

exports.addDog = (req, res) => {
    dogModel.addDog(req, res)
}


exports.deleteDog = (req, res) => {
    dogModel.deleteDog(req, res)
}
