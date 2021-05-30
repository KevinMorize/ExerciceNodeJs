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

                if (role === 0){
                res.status(200).redirect("/accueil")
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

    // register //
    static register (req, res) {
        const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
        const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const dogData = { 
            icad : req.body.icad, 
            name : req.body.name, 
            breed : req.body.breed, 
            birthday : req.body.birthday, 
            sexe : req.body.sexe, 
            size : req.body.size, 
            sterile : req.body.sterile, 
            description : req.body.description,
        }

        db.query("SELECT email FROM users WHERE email = ?", [req.body.email], async (error, results) => {

            console.log(req.body.password, req.body.passwordConfirm)

            if(error) {
                console.log(error);
            }

            if(results.length > 0) {
                return res.status(400).render('../views/users/register', {
                    emailMessage: 'Cet e-mail est déjà utilisé'
                })
            } else if (!EMAIL_REGEX.test(req.body.email)) {
                return res.status(400).render('../views/users/register', {
                    emailMessage: 'email invalide'
                });
            } else if(req.body.password !== req.body.passwordConfirm) {
                return res.status(400).render('../views/users/register', {
                    passwordMessage: 'Les mot-de-passe ne correspondent pas'
                });
            } else if (!PASSWORD_REGEX.test(req.body.password)) {
                return res.status(400).render('../views/users/register', {
                    passwordMessage: 'Mot-de-passe non valide (au moins 8 caractères, 1 majuscule, 1 chiffre et 1 caractère spécial'
                });
            }

            let hashedPassword = await bcrypt.hash(req.body.password, 8)

            let userData = { 
                password: hashedPassword,
                username : req.body.username, 
                email : req.body.email,  
                city : req.body.city, 
                bio : req.body.bio, 
                role : 0,
            }

            db.query('INSERT INTO users SET ?', [userData], (error, result) => {
                if (error){
                    console.log(error)
                }

                db.query('INSERT INTO dogs SET ?', [result.insertId, dogData], (error, result2)  => {
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
}

module.exports = authModel;