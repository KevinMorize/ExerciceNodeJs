const logModel = require('../models/logModel')

// loggedIn //

exports.loggedIn = (req, res, next) => {
    if (req.cookies.jwt) {
        logModel.loggedIn (req, res, next)    
    } else {
       next(); 
    }
}

// logOut //

exports.logOut = async (req, res) => {
    logModel.logOut (req, res)
}
