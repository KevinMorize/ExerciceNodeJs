const dogModel = require('../models/dogModel.js')
const db = require('../config/db')

exports.createDog = (req, res) => {
    if (req.user){
        dogModel.createDog(req, res)
    } else {
        res.redirect ("/")
    }
}

exports.updateDog = (req, res) => {
    dogModel.updateDog(req, res)
}

exports.deleteDog = (req, res) => {
    dogModel.deleteDog(req, res)
}
