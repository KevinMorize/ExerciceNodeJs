const db = require('../config/db')
const markModel = require('../models/markModel')

exports.mark = (req, res) => {
        db.query('SELECT * FROM marks WHERE idUser = ? AND idDog = ?', [req.user.idUser, req.query.id], (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result.length < 1){
                markModel.createMark(req, res)
            } else {
                markModel.deleteMark(req, res)
            }
        })
}