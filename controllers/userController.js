const usersModel = require('../models/usersModel')
const db = require('../config/db')

exports.updateUser = (req, res) => {
    if (req.user){
        db.query('SELECT * FROM users WHERE idUser = ?', [req.user.idUser], (error, result) => { 
            if(error) {
                throw(error)
            }

            if (req.body.email !== result[0].email) {
                db.query('SELECT * FROM users WHERE email = ?', [req.body.email], (error, result2) => {
                    if (result2.length > 0) {
                        return res.status(400).render('../views/users/userEdit', {
                            user: req.user, 
                            title: "Modifier mon profil", 
                            button: "edit",
                            message: 'Cet e-mail est déjà utilisé'
                        })
                    } else {
                        usersModel.updateUser(req, res)
                    }
                })
            } else {
                usersModel.updateUser(req, res)
            }
        })
    } else {
        res.redirect("/")
    }
}

exports.deleteUser = (req, res) => {
    if (req.user){
        usersModel.deleteUser(req, res)
    } else {
        res.redirect("/")
    }
}


 

