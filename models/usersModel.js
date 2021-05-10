const cookieParser = require('cookie-parser')
const db = require('../config/db')

class usersModel {

    // profil //
    static userProfil (req, res) {

        if (req.user) {
            db.query('SELECT * FROM users WHERE idUser = ?', [req.user.idUser], (err, result1) => {
                db.query('SELECT * FROM dogs WHERE idUser = ?', [req.user.idUser], (err, result2) => {
                    if (err){
                        console.log(err)
                    }
                    res.render('../views/users/profil', {title: "mon profil", user: result1[0], dogs: result2})     
                })
            })
        } else {
            res.redirect('/')
        }
    }

    // edit profil //
    static updateProfilView (req, res) {
        db.query('SELECT username, email, city, bio FROM users WHERE idUser = ?', req.query.id, (error, result) =>{
            res.render('../views/users/setProfil', { user: result[0], title: "Modifier mon profil", button: "edit" })
        })
    }

    static updateUser (req, res) {

        var param = [
            req.body,
            req.query.id
        ]

        db.query('UPDATE users SET ? WHERE idUser = ?', param, (error, response) => {
            console.log(param)
            if(error){
                throw(error)
            }
            res.redirect('/profil')
        })
    }

    // edit dogs
    static addDog (req,res) {
        const { icad, name, breed, birthday, sexe, size, sterile, dogAttachment, description } = req.body

        db.query('INSERT INTO dogs SET ?', {idUser: req.user.idUser, dogAttachment: dogAttachment, icad: icad, name: name, breed: breed, birthday: birthday, sexe: sexe, size: size, sterile: sterile, description: description }, (error, results) => {
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

module.exports = usersModel