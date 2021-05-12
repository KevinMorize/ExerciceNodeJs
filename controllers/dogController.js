const dogModel = require('../models/dogModel.js')

exports.dogProfilView = (req, res) => {
    dogModel.getDog(req, res)
}

exports.deleteDog = (req, res) => {
    dogModel.deleteDog(req, res)
}
