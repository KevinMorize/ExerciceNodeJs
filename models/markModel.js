const db = require('../config/db')

class markModel {
 
    static createMark (req, res) {
        let data = {
            idUser: req.user.idUser, 
            idDog: req.query.id, 
        } 

        db.query('INSERT INTO marks SET ?' , [data], (error, result)  => {
            if (error) {
                console.log(error);            
            }           
            res.redirect('back');
        });    
    }

    static deleteMark (req, res) {
            db.query('DELETE FROM marks WHERE idUser = ? AND idDog = ?' , [req.user.idUser, req.query.id], (error, result)  => {
                if (error) {
                    console.log(error);
                } 

            res.redirect('back')
            });  
    }
}

module.exports = markModel