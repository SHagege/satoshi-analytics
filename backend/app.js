const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose')
const dotenv = require('dotenv');

const portfolioRoutes = require('./routes/portfolio')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use(portfolioRoutes)

dotenv.config()

mongoose
    .connect(process.env.MONGOLAB_URI)
    .then(() => {
        app.listen(5000)
    })
    .catch(err => {
        console.log(err)
    })
