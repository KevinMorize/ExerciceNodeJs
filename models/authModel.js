const jwt = require('jsonwebtoken')
const bcrypt = require ('bcryptjs')
const db = require('../config/db')

class authModel {

    // login //
    static login (req, res) {
        try{
            const {email, password} = req.body;

            if( !email || !password ) {
                return res.status(400).render('../views/index', {
                    message: 'Veuillez renseigner un email et un mot de passe'
                })
            }

            db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {

            if(results.length < 1 || !(await bcrypt.compare(password, results[0].password)) ){
                res.status(401).render('../views/index', {
                    message: 'email ou mot de passe incorrect'
                })
                
            } else {
                const id = results[0].idUser;
                const role = results[0].role;

                const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log('the token is : ' + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }

                res.cookie('jwt', token, cookieOptions);

                if (role === 'Utilisateur'){
                res.status(200).redirect("/profil")
                } else {
                    res.status(200).redirect("/home-admin")
                }
            }
            })   

        } 
        
        catch (error) {
            console.log(error)
        }

    }

    static loginView (req, res) {
        res.render('../views/index');
    }

    // register //
    static register (req, res) {
        const { pseudo, email, city, bio, password, passwordConfirm, icad, dogname, breed, birthday, sexe } = req.body

        db.query("SELECT email FROM users WHERE email = ?", [email], async (error, results) => {

            if(error) {
                console.log(error);
            }

            if(results.length > 0) {
                return res.render('../views/users/register', {
                    emailMessage: 'Cet e-mail est déjà utilisé'
                })
            
            } else if(password !== passwordConfirm) {
                return res.render('../views/users/register', {
                    passwordMessage: 'Les mot-de-passe ne correspondent pas'
                });
            }

            let hashedPassword = await bcrypt.hash(password, 8)

            db.query('INSERT INTO users SET ?', {pseudo: pseudo, email: email, city: city, bio: bio, password: hashedPassword, role: 'Utilisateur'}, (error, result1) => {
                if (error){
                    console.log(error)
                }
                db.query('INSERT INTO dogs SET ?', {idUser: result1.insertId, icad: icad, nom: dogname, race: breed, age: birthday, sexe: sexe }, (error, result2)  => {
                    if (error) {
                        console.log(error);
                    } 
                });  

                res.render('../views/index', {
                    confirmMessage : "Inscription validée"
                })
            });
        });
    }

    static registerView (req, res) {
        res.render('../views/users/register')
    }

}

module.exports = authModel;