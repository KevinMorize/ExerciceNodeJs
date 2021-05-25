const db = require('../config/db')

class markModel {
 
    static createMark (req, res) {
        let data = {
            idUser: req.user.idUser, 
            idDog: req.query.id, 
            isMarked: "marked",
        }

        db.query('INSERT INTO marks SET ?' , [data], (error, result)  => {
            if (error) {
                console.log(error);
            } 
        res.redirect('/accueil')
        });    
    }

    static updateMark (req, res) {
        let data = {
            isMarked: "marked",
        }

        db.query('UPDATE marks SET ? WHERE idUser = ? AND idDog = ?' , [data, req.user.idUser, req.query.id], (error, result)  => {
            if (error) {
                console.log(error);
            } 
        res.redirect('/accueil')
        });    
    }

    static deleteMark (req, res) {
        let data = {
            isMarked: "unMarked",
        }
        
        db.query('UPDATE marks SET ? WHERE idUser = ? AND idDog = ?' , [data, req.user.idUser, req.query.id], (error, result)  => {
            if (error) {
                console.log(error);
            } 
        res.redirect('/accueil')
        });    
    }

}

module.exports = markModel