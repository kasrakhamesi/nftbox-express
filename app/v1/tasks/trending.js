const moduleNFT = require('../services/modulenft')

const trendingCollections = () => {
    moduleNFT.trending.SaveTopCollections.init()
        .then(() => {
            setTimeout(trendingCollections, 1500)
        })
        .catch(() => setTimeout(trendingCollections, 1500))
}

module.exports = trendingCollections
