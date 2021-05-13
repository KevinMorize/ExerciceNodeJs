const db = require('../config/db')

class usersModel {

    static getUserProfil (req, res) {

            db.query('SELECT * FROM users WHERE idUser = ?', [req.user.idUser], (err, result1) => {
                db.query('SELECT * FROM dogs WHERE idUser = ?', [req.user.idUser], (err, result2) => {
                    if (err){
                        console.log(err)
                    }
                    res.render('../views/users/profil', {title: "mon profil", user: result1[0], dogs: result2})     
                })
            })
    }

    static getUpdateUser (req, res) {
        db.query('SELECT * FROM users WHERE idUser = ?', [req.user.idUser], (error, result) =>{
            res.render('../views/users/setProfil', { user: result[0], title: "Modifier mon profil", button: "edit" })
        })
    }

    static updateUser (req, res) {

        var param = [
            req.body,
            req.user.idUser
        ]

        db.query('UPDATE users SET ? WHERE idUser = ?', param, (error, response) => {

            if(error){
                throw(error)
            }
            res.redirect('/profil')
        })
    }

    static deleteUser (req, res) {
        db.query('DELETE FROM users WHERE idUser = ?', req.user.idUser, (err, result) => {
            if (err){
                console.log(err)
            }    
            res.redirect('/')
        })
    }
}

module.exports = usersModel