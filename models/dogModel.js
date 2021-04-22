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
        db.query('DELETE FROM dogs WHERE idDogs = ?', req.query.id, (error, result) => {
            res.redirect('/profil')
        })
    }
}

module.exports = dogModel