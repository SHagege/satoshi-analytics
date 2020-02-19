if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/user')
const bcrypt = require('bcrypt')


passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({
        username: username
    }, async function (err, user) {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false);
        }
        if (!await bcrypt.compare(password, user.password)) {
            return done(null, false);
        }
        return done(null, user);
    });
})
)

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    User.findById(id, function (err, user) {
        cb(err, user);
    });
})

const flash = require('express-flash')
const session = require('express-session')

const portfolioRoutes = require('./routes/portfolio')
const userRoutes = require('./routes/users')

const app = express()
app.use(passport.initialize())
app.use(passport.session())

app.use(cors())
app.use(bodyParser.json())

app.use(portfolioRoutes)
app.use(userRoutes)

app.post('/login',
    passport.authenticate('local', { failureRedirect: '/error' }),
    function (req, res) {
        res.redirect('/success?username=' + req.user.username);
    });

app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))


dotenv.config()

mongoose
    .connect(process.env.MONGOLAB_URI)
    .then(() => {
        app.listen(5000)
    })
    .catch(err => {
        console.log(err)
    })
