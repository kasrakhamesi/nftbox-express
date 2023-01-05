const { opensea } = require('../services')

const getCollectionsStats = () => {
  opensea.collections
    .getCollectionStats()
    .then(() => {
      setTimeout(getCollectionsStats, 2000)
    })
    .catch(() => setTimeout(getCollectionsStats, 2000))
}

module.exports = getCollectionsStats
