const dogModel = require('../models/dogModel.js')
const db = require('../config/db')

exports.getDogProfil = (req, res) => {
    const id = req.user.idUser
    db.query('SELECT * FROM dogs WHERE idDog = ?', req.query.id, (err, result1) => {
        db.query('SELECT idUser, username FROM users WHERE idUser = ?', result1[0].idUser, (err, result2) => {

            if (err){
                console.log(err)
            }

            if (result1[0].sexe === 0){
                result1[0].sexe = "femelle"
            } else {
                result1[0].sexe = "mâle"
            }
        
            if (result1[0].size === 1){
                result1[0].size = "petit"
            } else if (result1[0].size === 2){
                result1[0].size = "moyen"
            } else {
                result1[0].size = "grand"
            }

            if (result1[0].sterile === 1){
                result1[0].sterile = "stérilisé"
            } else {
                result1[0].sterile = "non-stérilisé"
            }

            res.render('../views/users/dogProfil', {title: "Profil de " + result1[0].name, dog: result1[0], user:result2[0], id: id})     
        })
    })
} 

exports.getCreateDog = (req, res) => {
    res.render('../views/users/dogEdit', { dog: "none", title: "ajouter un chien", button: "add"})
}

exports.createDog = (req, res) => {
    if (req.user){
        dogModel.createDog(req, res)
    } else {
        res.redirect ("/")
    }
}

exports.getUpdateDog = (req, res) => {
    db.query('SELECT * FROM dogs WHERE idDog = ?', req.query.id, (error, result) =>{
        res.render('../views/users/dogEdit', { dog: result[0], title: "modifier " + result[0].name, button: "update" })
    })
}

exports.updateDog = (req, res) => {
    dogModel.updateDog(req, res)
}

exports.deleteDog = (req, res) => {
    dogModel.deleteDog(req, res)
}
