const mongoose = require('mongoose')
const Portfolio = require('./portfolio')

const Schema = mongoose.Schema

const CoinSchema = new Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true }
})

const CoinModel = mongoose.model('Coin', CoinSchema)
module.exports = CoinModel;
