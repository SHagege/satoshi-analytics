const HttpError = require('../models/http-error')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const register = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword
        })
        newUser.save()
        res.status(200).json({ message: "User created" })
    } catch {
        res.status(501).json({ message: "Can't create user" })
    }
    console.log(newUser)
}

exports.register = register