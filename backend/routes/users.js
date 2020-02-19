const express = require('express')
const userController = require('../controllers/users-controllers')
const passport = require('passport')

const router = express.Router()

router.post('/register', userController.register)

router.get('/success', (req, res) => res.send("Welcome " + req.query.username + "!!"));
router.get('/error', (req, res) => res.send("error logging in"));

module.exports = router