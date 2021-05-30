const db = require('../config/db')
const moment = require('moment');
const { mark } = require('./markController');
const { end } = require('../config/db');

// main
exports.home = (req, res) => {
    if (req.user){
        db.query('SELECT * FROM dogs LIMIT 10', (err, result) => {

                result.map(function (e){
                    let unixTimeStamp = moment().format('X') - moment(e.birthday).format('X');
                    let year = Math.floor(unixTimeStamp / 31536000);
                    let month = (Math.floor((unixTimeStamp / 31536000) * 10)) - (Math.floor(unixTimeStamp / 31536000) * 10);
        
                    if (year === 0 && month > 0){
                        return e.birthday = month + " mois"
                    } else if (year === 0 && month === 0){
                        return e.birthday = "< 1 mois"
                    } else if (year === 1){
                        return e.birthday = year + " an et " + month + " mois"
                    } else {
                        return e.birthday = year + " ans et " + month + " mois"
                    }
                })


                // result.forEach(function (dog){
                //     db.query('SELECT * FROM marks WHERE idUser = ? AND idDog = ?', [req.user.idUser, dog.idDog],(err, result2) => {
                //         if (result2.length >= 1){
                //             isMarked(marked)
                //         } else {
                //             isMarked(undefined)
                //         }
                //     }) 
                // })

                // function isMarked (data) {
                //     var marked = []
                //     if (data) {
                //         marked.push(data)
                //     }
                // }
                
                res.render('../views/users/home', {
                    title: "accueil", 
                    user: req.user,
                    newDogs: result,
                })
        })
    } else {
        res.redirect('/')
    }
}

exports.localise = (req, res) => {
    if (req.user){
        res.render('../views/users/localise', {
            title: "autour de moi",
            user: req.user
        })
    } else {
        res.redirect('/')
    }
}

exports.walks = (req, res) => {
    if (req.user){
        res.render('../views/users/walks', {
            title: "mes balades",
            user: req.user
        })
    } else {
        res.redirect('/')
    }
}

exports.profil = async (req, res) => {
    if (req.user){
        db.query('SELECT * FROM users WHERE idUser = ?', [req.user.idUser], (err, result) => {
            db.query('SELECT * FROM dogs WHERE idUser = ?', [req.user.idUser], (err, result2) => {
                db.query('SELECT * FROM dogs INNER JOIN marks ON dogs.idDog = marks.idDog AND marks.idUser = ? ORDER BY dogs.name', [req.user.idUser], (err, result3) => {

                    if (err){
                        console.log(err)
                    }

                    result3.map(function (e){
                        let unixTimeStamp = moment().format('X') - moment(e.birthday).format('X');
                        let year = Math.floor(unixTimeStamp / 31536000);
                        let month = (Math.floor((unixTimeStamp / 31536000) * 10)) - (Math.floor(unixTimeStamp / 31536000) * 10);
            
                        if (year === 0 && month > 0){
                            return e.birthday = month + " mois"
                        } else if (year === 0 && month === 0){
                            return e.birthday = "< 1 mois"
                        } else if (year === 1){
                            return e.birthday = year + " an et " + month + " mois"
                        } else {
                            return e.birthday = year + " ans et " + month + " mois"
                        }
                    })

                    res.render('../views/users/profil', {
                        title: "mon profil", 
                        user: result[0], 
                        dogs: result2,
                        marked: result3,
                    })
                })     
            })
        })
    } else {
        res.redirect('/')
    }
 }

 //user
 exports.updateUser = (req, res) => {
    if (req.user){
        db.query('SELECT * FROM users WHERE idUser = ?', [req.user.idUser], (error, result) =>{
            res.render('../views/users/userEdit', { 
                user: result[0], 
                title: "Modifier mon profil", 
                button: "edit" 
            })
        })
    } else {
        res.redirect("/")
    }
}

//dog
exports.getDog = (req, res) => {

    db.query('SELECT * FROM dogs WHERE idDog = ?', req.query.id, (err, result1) => {     
        db.query('SELECT idUser, username, userAttachment FROM users WHERE idUser = ?', result1[0].idUser, (err, result2) => {
            db.query('SELECT * FROM marks WHERE idUser = ? AND idDog = ? ', [req.user.idUser, req.query.id], (err, result3) => {

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

                let unixTimeStamp = moment().format('X') - moment(result1[0].birthday).format('X');
                let year = Math.floor(unixTimeStamp / 31536000);
                let month = (Math.floor((unixTimeStamp / 31536000) * 10)) - (Math.floor(unixTimeStamp / 31536000) * 10);

                if (year === 0 && month > 0){
                    result1[0].birthday = month + " mois"
                } else if (year === 0 && month === 0){
                    result1[0].birthday = "< 1 mois"
                } else if (year === 1){
                    result1[0].birthday = year + " an et " + month + " mois"
                } else {
                    result1[0].birthday = year + " ans et " + month + " mois"
                }

                res.render('../views/users/dogProfil', {
                    title: "Profil de " + result1[0].name, 
                    dog: result1[0], 
                    owner:result2[0],
                    user: req.user,
                    marked: result3[0],
                })  
            })    
        })
    })
} 

exports.createDog = (req, res) => {
    res.render('../views/users/dogEdit', { 
        dog: "none", 
        title: "ajouter un chien", 
        button: "add",
        user: req.user
    })
}

exports.updateDog = (req, res) => {
    db.query('SELECT * FROM dogs WHERE idDog = ?', req.query.id, (error, result) =>{
        res.render('../views/users/dogEdit', { 
            dog: result[0], 
            title: "modifier " + result[0].name, 
            button: "update",
            user: req.user
        })
    })
}