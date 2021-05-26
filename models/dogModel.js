const db = require('../config/db')

class dogModel {

    static createDog (req,res) {
        console.log(req.file)
        if (req.file){
            var data = {
                idUser: req.user.idUser,
                icad: req.body.icad, 
                name: req.body.name, 
                breed: req.body.breed, 
                birthday: req.body.birthday, 
                sexe: req.body.sexe, 
                size: req.body.size, 
                sterile: req.body.sterile, 
                description: req.body.description,
                dogAttachment: req.file.originalname
            }
        } else {
            var data = {
                idUser: req.user.idUser,
                icad: req.body.icad, 
                name: req.body.name, 
                breed: req.body.breed, 
                birthday: req.body.birthday, 
                sexe: req.body.sexe, 
                size: req.body.size, 
                sterile: req.body.sterile, 
                description: req.body.description,
            }
        }

        db.query('INSERT INTO dogs SET ?', data , (error, results) => {
            if (error){
                console.log(error)
            }
            
        res.redirect('/dog-profil?id='+ results.insertId)
        });
    }

    static updateDog (req, res) {
            if (req.file){
                var data = {
                name: req.body.name,  
                sterile: req.body.sterile, 
                description: req.body.description,
                dogAttachment: req.file.originalname,
                }
            } else {
                var data = {
                    name: req.body.name,  
                    sterile: req.body.sterile, 
                    description: req.body.description,
                }
            }

        db.query('UPDATE dogs SET ? WHERE idDog = ?', [data, req.query.id], (error, response) => {
            if(error){
                throw(error)
            }
            res.redirect('/dog-profil?id='+ req.query.id)
        })
    }

    static deleteDog (req, res) {
        db.query('DELETE FROM dogs WHERE idDog = ?', req.query.id, (err, result) => {
            if (err){
                console.log(err)
            }    
            res.redirect('/profil')
        })
    }
}

module.exports = dogModel