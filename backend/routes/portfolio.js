const express = require('express')

const portfolioController = require('../controllers/portfolio-controllers')

const router = express.Router()

router.get('/portfolio', portfolioController.getPortfolio)

router.post('/add', portfolioController.addCoin)

module.exports = router
