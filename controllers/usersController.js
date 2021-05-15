const usersModel = require('../models/usersModel')
const db = require('../config/db')

// views //
exports.homeView = async (req, res) => {
    db.query('SELECT * FROM dogs LIMIT 10', (err, result1) => {
        db.query('SELECT * FROM marks WHERE idUser = ?', req.user.idUser, async (err, result2) => {
            
            let idDogs = await result2.map(function(e) {
                return e.idDog         
            });

            res.render('../views/users/home', {title: "accueil", newDogs: result1, userId: req.user.idUser, marked: idDogs})
        })
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


 

