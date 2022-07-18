const moduleNFT = require('../services/modulenft')

const getListings = () => {
    moduleNFT.listings
        .getListingsChangePercent()
        .then(() => {
            setTimeout(getListings, 10000)
        })
        .catch(() => setTimeout(getListings, 10000))
}

module.exports = getListings
