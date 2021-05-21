const db = require('../config/db')

class usersModel {

    static updateUser (req, res) {

        let data = {
            email: req.body.email, 
            username: req.body.username, 
            city: req.body.city, 
            bio: req.body.bio, 
            cover: req.files[0].originalname,
            userAttachment: req.files[1].originalname,
        }

        db.query('UPDATE users SET ? WHERE idUser = ?', [data, req.user.idUser], (error, response) => {

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