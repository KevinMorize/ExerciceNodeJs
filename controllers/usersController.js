const usersModel = require('../models/usersModel')
const db = require('../config/db')

// views //
exports.homeView = (req, res) => {
    db.query('SELECT * FROM dogs LIMIT 10', (err, result) => {
        res.render('../views/users/home', {title: "acceuil", newDogs: result})
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


 

