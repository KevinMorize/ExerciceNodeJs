const dogModel = require('../models/dogModel.js')

exports.dogProfilView = (req, res) => {
    dogModel.dogProfilView(req, res)
}
