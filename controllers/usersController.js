const usersModel = require('../models/usersModel')

// views //
exports.homeView = (req, res) => {
    res.render('../views/users/home', {
        title: "acceuil"
    })
}

exports.localiseView = (req, res) => {
        res.render('../views/users/localise', {
            title: "autour de moi"
        })
}

exports.walksView = (req, res) => {
    res.render('../views/users/walks', {
        title: "mes balades"
    })
}

exports.profilView = async (req, res) => {
   if (req.user){
       usersModel.getUserProfil(req, res)
   } else {
       res.redirect("/")
   }
}

exports.getUpdateProfil = (req, res) => {
    if (req.user){
        usersModel.getUpdateUser(req, res)
    } else {
        res.redirect("/")
    }
}

exports.updateProfil = (req, res) => {
    if (req.user){
        usersModel.updateUser(req, res)
    } else {
        res.redirect("/")
    }
}

exports.deleteProfil = (req, res) => {
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


 

