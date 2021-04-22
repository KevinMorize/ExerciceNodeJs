const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const db = require('../config/db')

class logModel{
    // loggedIn //
    static loggedIn = async (req, res, next) => {
        try{
            const decodedToken = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
            db.query('SELECT * FROM users WHERE idUser = ?', [decodedToken.id], async (error, results) => {
                if (!results){
                    return next();
                }
                req.user = results[0]
                return next()
            });

        } catch (error){
            console.log(error)
            return next();
        }
    }

    // logOut
    static logOut = async (req, res) => {
        res.cookie('jwt', 'logout', {
            expires: new Date(Date.now() + 2 * 1000),
            httpOnly : true
        })
        res.status(200).redirect("/")
    }
}

module.exports = logModel