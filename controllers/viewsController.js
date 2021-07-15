const db = require('../config/db')
const moment = require('moment');

// main
exports.home = (req, res) => {
    if (req.user){
        db.query('SELECT * FROM dogs ORDER BY createdAt DESC LIMIT 10', (err, result) => {
            db.query('SELECT * FROM marks WHERE idUser = ?', [req.user.idUser],(err, result2) => {

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
                
                res.render('../views/users/home', {
                    title: "accueil", 
                    user: req.user,
                    newDogs: result,
                    marked: result2,
                })
            })
        })
    } else {
        res.redirect('/')
    }
}

exports.localise = async (req, res) => {
    if (req.user){

        const city = req.user.city;
        const cp = city.slice(city.indexOf('-') + 2);

        db.query('SELECT * FROM users', (error, result) => {
            if(error) {
                console.log(error)
            }

            result.map(function (e){
                var city = e.city
                e.city = city.slice(city.indexOf('-') + 2)
            })
            db.query('SELECT * FROM dogs', (error, result2) => {
                if(error) {
                    console.log(error)
                }
                result2.map(function (e){
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

                res.render('../views/users/localise', {
                    title: "rechercher",
                    user: req.user,
                    userCp: cp,
                    usersAround : result,
                    dogsAround : result2,
                })
            })
        })
    } else {
        res.redirect('/')
    }
}

exports.walks = (req, res) => {
    if (req.user){
        // invitations
        db.query('SELECT * FROM walks WHERE idWalk IN (SELECT idWalk FROM invitations WHERE idUser = ? AND accept = 2)', [req.user.idUser], (error, invitationWalkResult) => {
            if(error){
                throw error
            }
            invitationWalkResult.forEach(function (e){
                var checkDate = moment().format('X') - moment(e.day).format('X');
                let day = moment(e.day).format('MMMM Do YYYY');
                if (e.day && checkDate < 0){
                    e.day = day
                } else if (checkDate > 0){
                    e.day = false
                }
                if (e.start){
                    e.start = e.start.slice(0, 2) + "h" + e.start.slice(3, 5)
                }  
                if (e.end){
                    e.end = e.end.slice(0, 2) + "h" + e.end.slice(3, 5)
                }

            })
            // invited table
            db.query('SELECT idWalk, idDog FROM invitations WHERE idWalk IN (SELECT idWalk FROM invitations WHERE idUser = ? AND accept = 2)', [req.user.idUser], (error, inviteTableResult) => {
                // invitedDogImg
                db.query('SELECT idDog, dogAttachment FROM dogs WHERE idDog IN(SELECT idDog FROM invitations WHERE idWalk IN (SELECT idWalk FROM invitations WHERE idUser = ? AND accept = 2))', [req.user.idUser], (error, dogInvitationResult) => {

                    // accepted
                    db.query('SELECT * FROM walks WHERE idWalk IN (SELECT idWalk FROM invitations WHERE idUser = ? AND accept = 1)', [req.user.idUser], (error, acceptationWalkResult) => {
                    if(error){
                        throw error
                    }
                    acceptationWalkResult.forEach(function (element){
                        var checkDate = moment().format('X') - moment(element.day).format('X');
                        let day = moment(element.day).format('MMMM Do YYYY');
                        if (element.day && checkDate < 0){
                            element.day = day
                        } else if (checkDate > 0){
                            element.day = false
                        }
                        if (element.start){
                            element.start = element.start.slice(0, 2) + "h" + element.start.slice(3, 5)
                        }  
                        if (element.end){
                            element.end = element.end.slice(0, 2) + "h" + element.end.slice(3, 5)
                        }

                    })
                        // accepted table
                        db.query('SELECT idWalk, idDog FROM invitations WHERE idWalk IN (SELECT idWalk FROM invitations WHERE idUser = ? AND accept = 1)', [req.user.idUser], (error, acceptTableResult) => {
                            // accptedDogImg
                            db.query('SELECT idDog, dogAttachment FROM dogs WHERE idDog IN(SELECT idDog FROM invitations WHERE idWalk IN (SELECT idWalk FROM invitations WHERE idUser = ? AND accept = 1))', [req.user.idUser], (error, dogAcceptationResult) => {

                                // created
                                db.query('SELECT * FROM walks WHERE idUser = ?', [req.user.idUser], (error, createWalkResult) => {
                                    if(error){
                                        throw error
                                    }
                                    createWalkResult.map(function (elem){
                                        var checkDate = moment().format('X') - moment(elem.day).format('X');
                                        let day = moment(elem.day).format('MMMM Do YYYY');
                                        if (elem.day && checkDate < 0){
                                            elem.day = day
                                        } else if (checkDate > 0){
                                            elem.day = false
                                        }
                                        if (elem.start){
                                            elem.start = elem.start.slice(0, 2) + "h" + elem.start.slice(3, 5)
                                        }  
                                        if (elem.end){
                                            elem.end = elem.end.slice(0, 2) + "h" + elem.end.slice(3, 5)
                                        }
                                    }) 
                                    // created table
                                    db.query('SELECT idWalk, idDog FROM invitations WHERE idWalk IN (SELECT idWalk FROM walks WHERE idUser = ?)', [req.user.idUser], (error, createTableResult) => {
                                        // dogCreatedImg
                                        db.query('SELECT idDog, dogAttachment FROM dogs WHERE idDog IN(SELECT idDog FROM invitations WHERE idWalk IN (SELECT idWalk FROM walks WHERE idUser = ?))', [req.user.idUser], (error, dogCreateResult) => {
                                            if(error){
                                                throw error
                                            }
                                            res.render('../views/users/walk', {
                                                title: "mes balades",
                                                user: req.user,
                                                // invitations
                                                invited: invitationWalkResult,
                                                invitations: inviteTableResult,
                                                dogsInvited: dogInvitationResult,
                                                //accepted
                                                accepted: acceptationWalkResult,
                                                acceptation: acceptTableResult,
                                                dogsAccepted: dogAcceptationResult,
                                                //created
                                                created: createWalkResult,
                                                creation: createTableResult,
                                                dogsCreated: dogCreateResult                    
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
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

                    result[0].city = result[0].city.slice(0, result[0].city.indexOf(' -'))

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
                title2: "Modifier mon profil", 
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
        db.query('SELECT idUser, username, userAttachment, city FROM users WHERE idUser = ?', result1[0].idUser, (err, result2) => {
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
                } else if(year > 0 && month === 0){
                    result1[0].birthday = year + " ans"
                } else if(year === 1 && month === 0){
                    result1[0].birthday = year + " an"
                } else {
                    result1[0].birthday = year + " ans et " + month + " mois"
                }

                result2[0].city = result2[0].city.slice(0, result2[0].city.indexOf(' -'))

                res.render('../views/users/dogProfil', {
                    title2: "Profil de " + result1[0].name, 
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
        title2: "ajouter un chien", 
        button: "add",
        user: req.user
    })
}

exports.updateDog = (req, res) => {
    db.query('SELECT * FROM dogs WHERE idDog = ?', req.query.id, (error, result) =>{
        res.render('../views/users/dogEdit', { 
            dog: result[0], 
            title2: "modifier " + result[0].name, 
            button: "update",
            user: req.user
        })
    })
}

//balades
exports.createWalk = (req, res) => {
    if (req.user){
        db.query('SELECT idDog, name, breed, dogAttachment FROM dogs WHERE idDog IN (SELECT idDog FROM marks WHERE idUser = ?)', [req.user.idUser], (err, result) => {
            db.query('SELECT * FROM dogs WHERE dogs.idUser = ?', [req.user.idUser], (err, result2) => {
                db.query('SELECT * FROM dogs WHERE idDog = ?', [req.query.id], (err, result3) => {

                        res.render('../views/users/walkAdd', { 
                            title2: "Créer une balades", 
                            user: req.user,
                            marks: result,
                            dogs: result2,
                            query: result3[0],
                        })
                })
            })
        })
    } else {
        res.redirect('/')
    }
}

exports.updateWalk = (req, res) => {
    if (req.user){
        db.query('SELECT * FROM walks where idWalk = ?', [req.query.id], (err, result) => {

            result[0].day = moment(result[0].day).format('YYYY-MM-DD');
            result[0].start = result[0].start.slice(0, 2) + ":" + result[0].start.slice(3, 5)
            result[0].end = result[0].end.slice(0, 2) + ":" + result[0].end.slice(3, 5)


            res.render('../views/users/walkEdit', { 
                title2: "Modifier mes balades", 
                user: req.user,
                walkEdit: result[0],
            })
        })
    }
} 

exports.walkView = async (req, res) => {
    if (req.user){
        db.query('SELECT * FROM walks WHERE idWalk = ?', [req.query.id], (err, result) => {
            db.query('SELECT * FROM invitations WHERE idWalk = ? AND idUser = ?', [req.query.id, req.user.idUser], (err, result2) => {
                db.query('SELECT idDog, dogAttachment, name, breed, birthday FROM dogs WHERE idDog IN (SELECT idDog FROM invitations WHERE idWalk = ?)', [req.query.id], (err, result3) => {

                    result.forEach(function (e){
                        let day = moment(e.day).format('MMMM Do YYYY');
                        if (e.day){
                            e.day = day
                        }
                        if (e.start){
                            e.start = e.start.slice(0, 2) + "h" + e.start.slice(3, 5)
                        }  
                        if (e.end){
                            e.end = e.end.slice(0, 2) + "h" + e.end.slice(3, 5)
                        }
        
                    })

                        res.render('../views/users/walkView', { 
                            title2: "Balade de " + result[0].username,
                            user: req.user,
                            walk: result[0],
                            check: result2[0],
                            dogs: result3,
                        })
                })
            })
        })
    } else {
        res.redirect('/')
    }
}

