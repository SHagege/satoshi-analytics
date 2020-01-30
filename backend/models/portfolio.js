const mongoose = require('mongoose')
const Coin = require('./coin')

const Schema = mongoose.Schema

const PortfolioSchema = new Schema({
    coins: [{ type: mongoose.Types.ObjectId, ref: 'Coin' }]
})

const PortfolioModel = mongoose.model('Portfolio', PortfolioSchema)
module.exports = PortfolioModel;