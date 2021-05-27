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
            
            res.redirect('back');
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

            res.redirect('back')
            });
        })    
    }
}

module.exports = markModel