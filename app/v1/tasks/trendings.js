const { reservoir } = require('../services')

const trendingCollections = () => {
  reservoir.collections
    .save()
    .then(() => {
      setTimeout(trendingCollections, 1500)
    })
    .catch(() => setTimeout(trendingCollections, 1500))
}

module.exports = trendingCollections
