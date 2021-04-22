const db = require('../config/db')

class usersModel {

// views //
    static homeView (req, res) {
        res.render('../views/users/home', {
            title: "acceuil"
        })
    }

    static localiseView (req, res) {
        res.render('../views/users/localise', {
            title: "autour de moi"
        })
    }

    static walksView (req, res) {
        res.render('../views/users/walks', {
            title: "mes balades"
        })
    }

    // profil //

    static profilView (req, res) {
        if (req.user) {

            db.query('SELECT * FROM dogs WHERE idUser = ?', [req.user.idUser], (err, result) => {
                if (err){
                    console.log(err)
                }
                res.render('../views/users/profil', {
                    title: "mon profil",
                    name: req.user.pseudo,
                    city: req.user.city,
                    bio: req.user.bio,
                    id: req.user.idUser,
                    dogInfo: result, 
                })
            })  


        } else {
            res.redirect('/')
        }
    }

    // update-profil //

    static updateProfilView (req, res) {
        console.log('-----------', req.query.id)
        db.query('SELECT pseudo, email, city, bio FROM users WHERE idUser = ?', req.query.id, (error, result) =>{
            res.render('../views/users/setProfil', { show: result[0], title: "Modifier mon profil", button: "edit" })
        })
    }

}

module.exports = usersModel