const db = require('../config/db')

class usersModel {

    static updateUser (req, res) {

        const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
        
        if (!EMAIL_REGEX.test(req.body.email)) {
                return res.status(400).render('../views/users/userEdit', {
                    user: req.user, 
                    title: "Modifier mon profil", 
                    button: "edit",
                    message: 'email invalide'
                })
        } 

        if (req.body.email !== req.body.emailConfirm) {
            return res.status(400).render('../views/users/userEdit', {
                user: req.user, 
                title: "Modifier mon profil", 
                button: "edit",
                message: "les emails ne correspondent pas"
            })
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