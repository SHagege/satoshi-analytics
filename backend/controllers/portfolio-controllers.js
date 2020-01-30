const HttpError = require('../models/http-error')
const Portfolio = require('../models/portfolio')
const Coin = require('../models/coin')
const mongoose = require('mongoose')

const addCoin = (req, res, next) => {
    mongoose.connection.db.listCollections({ name: 'portfolios' })
        .next(function (err, portfolio) {
            if (!portfolio) {
                console.log("Salut")
                const portfolio = new Portfolio()
                portfolio.save()
            }
            portfolio = new Portfolio()
            const coinName = new Coin({
                name: req.body.coinName
            })
            coinName.save()
            portfolio.coins.push(coinName)
            res.status(201).json(addCoin)
        });
}

const getPortfolio = async (req, res, next) => {
    let coins
    try {
        coins = await Coin.find({}, ['-_id', '-__v', '-id'])

    } catch (err) {
        const error = new HttpError(
            'Fail',
            500
        )
        return next(error)
    }
    res.status(201).json({ coins: coins.map(coin => coin.toObject({ getters: true })) })
}

exports.addCoin = addCoin
exports.getPortfolio = getPortfolio