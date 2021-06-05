const walkModel = require('../models/walkModel')
const db = require('../config/db')

exports.createWalk = (req, res) => {
    if (req.body){
        walkModel.create(req, res)
    } else {
        res.redirect('/balades')
    } 
}