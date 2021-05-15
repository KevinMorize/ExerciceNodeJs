const db = require('../config/db')
const markModel = require('../models/markModel')

exports.mark = (req, res) => {
    let sql = 'SELECT * FROM marks WHERE idUser = ? AND idDog = ?';
        db.query(sql, [req.user.idUser, req.query.id], (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result.length < 1){
                markModel.createMark(req, res)
            } else if (result) {
                markModel.deleteMark(req, res)
            }
        })
}