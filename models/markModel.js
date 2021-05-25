const db = require('../config/db')

class markModel {
 
    static createMark (req, res) {
        db.query('INSERT INTO marks SET ?' , {idUser: req.user.idUser, idDog: req.query.id}, (error, result)  => {
            if (error) {
                console.log(error);
            } 
        res.redirect('/accueil')
        });    
    }

    static deleteMark (req, res) {
        db.query('DELETE FROM marks WHERE idDog = ?', req.query.id, (err, result) => {
            if (err){
                console.log(err)
            }    
            res.redirect('/accueil')
        })
    }

}

module.exports = markModel