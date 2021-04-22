const adminModel = require('../models/adminModel')

// views //

exports.homeView = (req, res) => {
    adminModel.home(req, res)
}  

exports.addUserView = (req, res) => {
    adminModel.addUserView(req, res)
}

exports.updateUserView = (req, res) => {
    adminModel.updateUserView(req, res)
}

// setUser //
exports.addUser = (req, res) => {
    adminModel.addUser(req, res)
}

exports.updateUser = (req, res) => {
    adminModel.updateUser(req, res)
}

exports.deleteUser = (req, res) => {
    adminModel.deleteUser(req, res)
}




