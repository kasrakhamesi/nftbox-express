const { opensea } = require('../services')

const getCollectionsStats = () => {
  opensea.collections
    .getCollectionFloorPrice()
    .then(() => {
      setTimeout(getCollectionsStats, 1500)
    })
    .catch(() => setTimeout(getCollectionsStats, 1500))
}

module.exports = getCollectionsStats
