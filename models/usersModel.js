const db = require('../config/db')

class usersModel {

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