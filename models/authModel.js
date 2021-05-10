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

    // register //
    static register (req, res) {
        const { username, email, city, bio, password, passwordConfirm, userAttachment, cover, icad, name, breed, birthday, sexe, size, sterile, dogAttachment, description } = req.body

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

            db.query('INSERT INTO users SET ?', {username: username, email: email, city: city, bio: bio, userAttachment: userAttachment, cover: cover, password: hashedPassword, role: 0}, (error, result1) => {
                if (error){
                    console.log(result1)
                }
                db.query('INSERT INTO dogs SET ?', {idUser: result1.insertId, icad: icad, name: name, breed: breed, birthday: birthday, sexe: sexe, size: size, sterile: sterile, dogAttachment: dogAttachment, description: description }, (error, result2)  => {
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