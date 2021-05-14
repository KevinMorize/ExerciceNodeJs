const db = require('../config/db')

class dogModel {

    static createDog (req,res) {
        const {icad, name, breed, birthday, sexe, size, sterile, description} = req.body

        db.query('INSERT INTO dogs SET ?', {idUser: req.user.idUser, icad: icad, name: name, breed: breed, birthday: birthday, sexe: sexe, size: size, sterile: sterile, description: description}, (error, results) => {
            if (error){
                console.log(error)
            }
        });
        res.redirect('/profil')
    }

    static updateDog (req, res) {

        var param = [
            req.body,
            req.query.id
        ]

        db.query('UPDATE dogs SET ? WHERE idDog = ?', param, (error, response) => {

            if(error){
                throw(error)
            }
            res.redirect('/dog-profil?id='+ req.query.id)
        })
    }

    static deleteDog (req, res) {
        db.query('DELETE FROM dogs WHERE idDog = ?', req.query.id, (err, result) => {
            if (err){
                console.log(err)
            }    
            res.redirect('/profil')
        })
    }
}

module.exports = dogModel