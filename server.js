//prodacson -----------------------------------
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()   
}

//configs-----------------------------------
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const port = process.env.PORT || 3000
const DB = process.env.DATABASE
const expressLayouts = require('express-ejs-layouts')
const Cours = require('./models/cours')
const User = require('./models/user')
const bcrypt = require('bcrypt')
const { render } = require('ejs')
const passport = require('passport')
const usersRouter = require('./routes/usersRouter')
const user = require('./models/user')
const flash = require('express-flash')
const session = require('express-session')
const initializePassport = require('./passport-config')
initializePassport(
    passport,
     email => users.find(user => user.email === email ),
    id =>  users.find(user => user.id === id ) 
)
const methodOverride = require('method-override')

//setting ----------------------------------
dotenv.config({ path: './config.env'})
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(expressLayouts) 
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.set('layout', 'layouts/layout')
app.use(flash())
app.use(methodOverride('_method'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
//pages ----------------------------------------------

const users = User.find({})
app.use('/admin', usersRouter)

app.get('/', async (req, res) => {

    const courses = await Cours.find()

    res.render('index.ejs', {courses: courses})
})


app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/login', async (req, res) => {
    res.render('login.ejs')    
})

//CONNECTIONS----------------------------------

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://Pedicare:iB3eLUzBEPnVmSPa@pedicaretest.9g28gqh.mongodb.net/pedicaretest?retryWrites=true")
.then(() => {
    console.log("DATABASE CONNECTED");  
})
.catch((err) => {
    console.log(err);
})
 
app.listen(port, () => {
    console.log("THE APP IS UP AND RUNING");
})