const walkModel = require('../models/walkModel')

exports.createWalk = (req, res) => {  
    if(req.user){
        walkModel.createWalk(req, res)
    }  else {
        res.redirect('/')
    }
}

