const db = require('../config/db')

class markModel {
 
    static createMark (req, res) {
        let data = {
            idUser: req.user.idUser, 
            idDog: req.query.id, 
            isMarked: "marked",
        } 

        let data2 = {
            isLiked: "liked",
        } 

        db.query('INSERT INTO marks SET ?' , [data], (error, result)  => {
            if (error) {
                console.log(error);
            } 

            db.query('UPDATE dogs SET ? WHERE idDog = ?' , [data2, req.query.id], (error, result)  => {
                if (error) {
                    console.log(error);
                } 
            
                res.redirect('/accueil');

            }); 
        });    
    }

    static updateMark (req, res) {
        db.query('SELECT * FROM marks WHERE idUser = ? AND idDog = ?', [req.user.idUser, req.query.id], (err, result) => {
            
            if( result[0].isMarked === "marked")
            var data = {
                isMarked: "unMarked",
            }

            if( result[0].isMarked === "unMarked")
            var data = {
                isMarked: "marked",
            }

            db.query('UPDATE marks SET ? WHERE idUser = ? AND idDog = ?' , [data, req.user.idUser, req.query.id], (error, result)  => {
                if (error) {
                    console.log(error);
                } 

            res.redirect('/accueil')
            });
        })    
    }
}

module.exports = markModel