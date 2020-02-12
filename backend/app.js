if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const initializePassport = require('./passport-config')
initializePassport(passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const portfolioRoutes = require('./routes/portfolio')
const userRoutes = require('./routes/users')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use(portfolioRoutes)
app.use(userRoutes)

app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

dotenv.config()

mongoose
    .connect(process.env.MONGOLAB_URI)
    .then(() => {
        app.listen(5000)
    })
    .catch(err => {
        console.log(err)
    })
