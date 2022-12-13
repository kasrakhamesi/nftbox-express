const { modulenft } = require('../services')

const trendingCollections = () => {
  modulenft.collections
    .getTrendings()
    .then(() => {
      setTimeout(trendingCollections, 15000)
    })
    .catch(() => setTimeout(trendingCollections, 15000))
}

module.exports = trendingCollections
