const walkModel = require('../models/walkModel')

exports.createWalk = (req, res) => {    
        walkModel.createWalk(req, res)
    }

