const { opensea } = require('../services')

const getTraits = () => {
  opensea.collections.getCollectionsTraits
    .then(() => {
      setTimeout(getTraits, 6000)
    })
    .catch(() => setTimeout(getTraits, 6000))
}

module.exports = getTraits
