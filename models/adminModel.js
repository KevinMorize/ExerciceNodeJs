const bcrypt = require ('bcryptjs')
const db = require('../config/db')

class adminModel {

// views //

    static home (req, res){
        db.query('SELECT * FROM users WHERE role = "Utilisateur"', (err, result1) => {       
            db.query('SELECT * FROM users WHERE role = "Administrateur"', (err, result2) => {
                res.render('../views/admin/home', {showUser: result1, showAdmin: result2})     
            })  
        })  
    }

    static addUserView (req, res) {
        res.render('../views/admin/addUser', { show: {}, title: "Ajouter utilisateur :", edit: "ok" })   
    }

    static updateUserView (req, res) {
        db.query('SELECT pseudo, email, city, bio FROM users WHERE idUser = ?', req.query.id, (error, result) =>{
            res.render('../views/admin/addUser', { show: result[0], title: "Modifier utilisateur :", button: "edit" })
        })
    }

// setUser //
    static addUser (req,res) {
        const { pseudo, email, city, bio, password, passwordConfirm, role} = req.body
    
        db.query("SELECT email FROM users WHERE email = ?", [email], async (error, results) => {
    
            if(error) {
                console.log(error);
            }
    
            if(results.length > 0) {
                return res.render('../views/admin/addUser', {
                    emailMessage: 'Cet e-mail est déjà utilisé', show: {}, title: "Ajouter utilisateur :", edit: "ok"
                })
            
            } else if(password !== passwordConfirm) {
                return res.render('../views/admin/addUser', {
                    passwordMessage: 'Les mot-de-passe ne correspondent pas', show: {}, title: "Ajouter utilisateur :", edit: "ok"
                });
            }
    
            let hashedPassword = await bcrypt.hash(password, 8)
    
            db.query('INSERT INTO users SET ?', {pseudo: pseudo, email: email, city: city, bio: bio, password: hashedPassword, role: role}, (error, results) => {
                if (error){
                    console.log(error)
                }
            });
            res.redirect('/home-admin')
        });
    }

    static updateUser (req, res) {

        var param = [
            req.body,
            req.query.id
        ]

        db.query('UPDATE users SET ? WHERE idUser = ?', param, (error, response) => {
            if(error){
                throw(error)
            }
            res.redirect('/home-admin')
        })
    }

    static deleteUser (req, res) {
        db.query('DELETE FROM users WHERE idUser = ?', req.query.id, (error, result) => {
            res.redirect('/home-admin')
        })
    }

}


module.exports = adminModel;