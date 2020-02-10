const HttpError = require('../models/http-error')
const Portfolio = require('../models/portfolio')
const Coin = require('../models/coin')
const mongoose = require('mongoose')

const addCoin = (req, res, next) => {
    mongoose.connection.db.listCollections({ name: 'portfolios' })
        .next(function (err, portfolio) {
            if (!portfolio) {
                const portfolio = new Portfolio()
                portfolio.save()
            }
            portfolio = new Portfolio()
            const coinName = new Coin({
                name: req.body.coinName,
                amount: req.body.amount
            })
            coinName.save()
            portfolio.coins.push(coinName)
            res.status(201).json(addCoin)
        });
}

const delCoin = async (req, res, next) => {
    const coinID = req.params.cid

    let coin
    try {
        coin = await Coin.findById(coinID)
    } catch (err) {
        const error = new HttpError(
            "Couldn't delete place",
            500
        );
        return next(error)
    }

    try {
        await coin.remove()
    } catch (err) {
        const error = new HttpError(
            "Couldn't delete place",
            500
        )
        return next(error)
    }
    res.status(200).json({ message: "Deleted Place" })
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
exports.delCoin = delCoin
exports.getPortfolio = getPortfolio