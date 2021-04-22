const mysql = require('mysql')

// DataBase
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Mylo&Co',
    // port: '8889'
});

db.connect(function(err) {
    if (err) {
        throw err
    } else {
        console.log("MySQL is connected to: " + process.env.DATABASE);
    }
});

module.exports = db;