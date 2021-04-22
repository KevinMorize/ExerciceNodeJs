const authModel = require('../models/authModel')

// login //
exports.login =  async (req, res) => {
    authModel.login(req, res)
}

exports.loginView = (req, res) => {
    authModel.loginView(req, res)
}

// register //
exports.register = async (req, res) => {
    authModel.register(req, res)
}

exports.registerView = (req, res) => {
    authModel.registerView(req, res)
}
