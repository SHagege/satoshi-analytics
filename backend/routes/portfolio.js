const express = require('express')

const portfolioController = require('../controllers/portfolio-controllers')

const router = express.Router()

router.get('/portfolio', portfolioController.getPortfolio)

router.post('/add', portfolioController.addCoin)

router.delete('/delete/:cid', portfolioController.delCoin)

module.exports = router
