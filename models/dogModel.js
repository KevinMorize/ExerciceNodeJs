const db = require('../config/db')

class dogModel {

    static addDogView (req, res) {
        res.render('../views/users/addDog', {title: "ajouter un chien"})
    }

    static addDog (req,res) {
        const {icad, dogname, breed, birthday, sexe} = req.body

        db.query('INSERT INTO dogs SET ?', {idUser: req.user.idUser, icad: icad, nom: dogname, race: breed, age: birthday, sexe: sexe }, (error, results) => {
            if (error){
                console.log(error)
            }
        });
        res.redirect('/profil')
    }

    static deleteDog (req, res) {
        db.query('DELETE FROM dogs WHERE idDog = ?', req.query.id, (err, result) => {
            if (err){
                console.log(err)
            }    
            res.redirect('/profil')
        })
    }

    static getDog (req, res) {

        db.query('SELECT * FROM dogs WHERE idDog = ?', req.query.id, (err, result1) => {
            db.query('SELECT username FROM users WHERE idUser = ?', result1[0].idUser, (err, result2) => {
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

                res.render('../views/users/dogProfil', {title: "Profil de " + result1[0].name, dog: result1[0], user:result2[0]})     
            })
        })
    } 
}

module.exports = dogModel