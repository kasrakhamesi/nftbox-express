const moduleNFT = require('../services/modulenft')

const getListings = () => {
    setInterval(moduleNFT.listings.getListingsChangePercent, 10000)
}

module.exports = getListings
