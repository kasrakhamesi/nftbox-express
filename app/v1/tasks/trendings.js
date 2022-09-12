const { modulenft } = require('../services')

const trendingCollections = () => {
  modulenft.collections
    .getTrendings()
    .then(() => {
      setTimeout(trendingCollections, 1500)
    })
    .catch(() => setTimeout(trendingCollections, 1500))
}

module.exports = trendingCollections
