const db = require('../config/db')

class walkModel {

    static create (req, res) {
        console.log(req.body)
        res.redirect('back')
    }
    
}

module.exports = walkModel