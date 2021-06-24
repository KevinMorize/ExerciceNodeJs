const dogModel = require('../models/dogModel.js')

exports.createDog = (req, res) => {
    if (req.user){
        dogModel.createDog(req, res)
    } else {
        res.redirect ("/")
    }
}

exports.updateDog = async (req, res) => {
    dogModel.updateDog(req, res)
}

exports.deleteDog = (req, res) => {
    dogModel.deleteDog(req, res)
}
