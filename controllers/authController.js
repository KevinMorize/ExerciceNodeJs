const authModel = require('../models/authModel')

// login //
exports.login =  async (req, res) => {
    authModel.login(req, res)
}

exports.loginView = (req, res) => {
    res.render('../views/index');
}

// register //
exports.register = async (req, res) => {
    authModel.register(req, res)
}

exports.registerView = (req, res) => {
    res.render('../views/users/register')
}
