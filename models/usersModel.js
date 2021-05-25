const db = require('../config/db')

class usersModel {

    static updateUser (req, res) {
        if (req.files.cover && req.files.image) {
            var data = {
                email: req.body.email, 
                username: req.body.username, 
                city: req.body.city, 
                bio: req.body.bio, 
                cover: req.files.cover[0].originalname,
                userAttachment: req.files.image[0].originalname,
            } 
        } else if (req.files.cover) {
            var data = {
                email: req.body.email, 
                username: req.body.username, 
                city: req.body.city, 
                bio: req.body.bio, 
                cover: req.files.cover[0].originalname,
            } 
        } else if (req.files.image) {
            var data = {
                email: req.body.email, 
                username: req.body.username, 
                city: req.body.city, 
                bio: req.body.bio, 
                userAttachment: req.files.image[0].originalname,
            } 
        } else {
            var data = {
                email: req.body.email, 
                username: req.body.username, 
                city: req.body.city, 
                bio: req.body.bio, 
            }
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