const walkModel = require('../models/walkModel')

exports.createWalk = (req, res) => {  
    if(req.user){
        walkModel.createWalk(req, res)
    }  else {
        res.redirect('/')
    }
}

exports.updateWalk = (req, res) => {  
    if(req.user){
        walkModel.updateWalk(req, res)
    }  else {
        res.redirect('/')
    }
}

exports.walkAccepted = (req, res) => {  
    if(req.user){
            walkModel.accepted(req, res)
    } else {
        res.redirect('/')
    }
}

exports.walkDeclined = (req, res) => {  
    if(req.user){
            walkModel.declined(req, res)
    } else {
        res.redirect('/')
    }
}


