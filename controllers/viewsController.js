const db = require('../config/db')

// main
exports.home = async (req, res) => {
    db.query('SELECT * FROM dogs LIMIT 10', (err, result1) => {
        db.query('SELECT * FROM marks WHERE idUser = ?', req.user.idUser, async (err, result2) => {         
            // let idDogs = await result2.map(function(e) {
            //     return e.idDog         
            // });
            res.render('../views/users/home', {title: "accueil", newDogs: result1, idUser: req.user.idUser, marked: result2})
        })
    })
}

exports.localise = (req, res) => {
    res.render('../views/users/localise', {
        title: "autour de moi"
    })
}

exports.walks = (req, res) => {
    res.render('../views/users/walks', {
        title: "mes balades"
    })
}

exports.profil = async (req, res) => {
    if (req.user){
        db.query('SELECT * FROM users WHERE idUser = ?', [req.user.idUser], (err, result1) => {
            db.query('SELECT * FROM dogs WHERE idUser = ?', [req.user.idUser], (err, result2) => {
                if (err){
                    console.log(err)
                }
                res.render('../views/users/profil', {title: "mon profil", user: result1[0], dogs: result2})     
            })
        })
    } else {
        res.redirect("/")
    }
 }

 //user
 exports.updateUser = (req, res) => {
    if (req.user){
        db.query('SELECT * FROM users WHERE idUser = ?', [req.user.idUser], (error, result) =>{
            res.render('../views/users/userEdit', { user: result[0], title: "Modifier mon profil", button: "edit" })
        })
    } else {
        res.redirect("/")
    }
}

//dog
exports.getDog = (req, res) => {
    const id = req.user.idUser
    db.query('SELECT * FROM dogs WHERE idDog = ?', req.query.id, (err, result1) => {
        db.query('SELECT idUser, username, userAttachment FROM users WHERE idUser = ?', result1[0].idUser, (err, result2) => {

            if (err){
                console.log(err)
            }

            if (result1[0].sexe === 0){
                result1[0].sexe = "femelle"
            } else {
                result1[0].sexe = "mâle"
            }
        
            if (result1[0].size === 1){
                result1[0].size = "petit"
            } else if (result1[0].size === 2){
                result1[0].size = "moyen"
            } else {
                result1[0].size = "grand"
            }

            if (result1[0].sterile === 1){
                result1[0].sterile = "stérilisé"
            } else {
                result1[0].sterile = "non-stérilisé"
            }

            res.render('../views/users/dogProfil', {title: "Profil de " + result1[0].name, dog: result1[0], user:result2[0], id: id})     
        })
    })
} 

exports.createDog = (req, res) => {
    res.render('../views/users/dogEdit', { dog: "none", title: "ajouter un chien", button: "add"})
}

exports.updateDog = (req, res) => {
    db.query('SELECT * FROM dogs WHERE idDog = ?', req.query.id, (error, result) =>{
        res.render('../views/users/dogEdit', { dog: result[0], title: "modifier " + result[0].name, button: "update" })
    })
}