const db = require('../config/db')

class walkModel {

    static createWalk (req, res) {

        let data = {
            idUser: req.user.idUser,
            username: req.user.username,
            userAttachment: req.user.userAttachment,
            day: req.body.day,
            start: req.body.start,
            end: req.body.end,
            adress: req.body.adress,
            zip: req.body.zip,
            city: req.body.city,
            description: req.body.description
        }

        let invitation = req.body.invited


        db.query('INSERT INTO walks SET ?', [data], (error, result) => {
            if(error){
                throw(error)
            }
            invitation.forEach(function(element){
                db.query('SELECT idUser FROM dogs WHERE idDog = ?', [element], (error, result2) => {
                    if(error){
                        throw(error)
                    }
                    result2.map(function(id){
                        if (id.idUser === req.user.idUser){
                            var data2 = {
                                idWalk: result.insertId,
                                idUser: id.idUser,
                                idDog: element,
                                accept: 1,
                            }
                        } else {
                            var data2 = {
                                idWalk: result.insertId,
                                idUser: id.idUser,
                                idDog: element,
                                accept: 2,
                            }
                        }
                        db.query('INSERT INTO invitations SET ?', [data2], (error, result3) => {
                            if(error){
                                throw(error)
                            }
                        })             
                    })
                })
            })
            res.redirect('/balades')
        })
    }

    static accepted (req, res) {

        db.query('UPDATE invitations SET accept = 1 WHERE idWalk = ? AND idUser = ?', [req.query.id, req.user.idUser], (error, response) => {
            if(error){
                throw(error)
            }
                res.redirect('/balades')
        })
    }

    static declined (req, res) {
        db.query('SELECT idUser FROM walks WHERE idWalk = ?', [req.query.id], (err, result) => {
            console.log(result[0].idUser, )
            if (result[0].idUser === req.user.idUser){
                db.query('DELETE FROM walks WHERE idWalk = ?', [req.query.id], (error, response) => {
                    if(error){
                        throw(error)
                    }
                        res.redirect('/balades')
                })              
            } else {
                db.query('DELETE FROM invitations WHERE idWalk = ? AND idUser = ?', [req.query.id, req.user.idUser], (error, response) => {
                    if(error){
                        throw(error)
                    }
                        res.redirect('/balades')
                })
            }
        })
    }
}

module.exports = walkModel