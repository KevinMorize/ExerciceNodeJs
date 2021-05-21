const usersModel = require('../models/usersModel')

exports.updateUser = (req, res) => {
    if (req.user){
        usersModel.updateUser(req, res)
    } else {
        res.redirect("/")
    }
}

exports.deleteUser = (req, res) => {
    if (req.user){
        usersModel.deleteUser(req, res)
    } else {
        res.redirect("/")
    }
}


// localise //

// exports.maps = async (req, res) => {
//     mapsModel.maps(req, res)
// }


 

