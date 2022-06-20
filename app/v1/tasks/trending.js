const moduleNFT = require('../services/modulenft')

const trendingCollections = () => {
    setInterval(moduleNFT.trending.SaveTopCollections.init, 1500)
}

module.exports = trendingCollections
