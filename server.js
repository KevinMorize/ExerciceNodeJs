if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const { Server } = require('http')
const { createSecretKey } = require('crypto')
const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

// MiddleWares
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DotEnv
dotenv.config({ path: './.env'})
    
// Parse URL-encoded bodies (sent by HTML forms)
app.use(express.urlencoded({extended : false}));
    
// Parse JSON bodies (sent by API client)
app.use(express.json());
app.use(cookieParser());
    
// Routes 
app.use('/', require('./routes/viewsRoutes'));
app.use('/', require('./routes/userRoutes'));
app.use('/', require('./routes/dogRoutes'));
app.use('/', require('./routes/markRoutes'));
app.use('/', require('./routes/authRoutes'));
    
// Server
app.listen(8080, () => {
    console.log("I'm listening on localhost:8080");
})
