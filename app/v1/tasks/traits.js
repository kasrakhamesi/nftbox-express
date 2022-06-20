const moduleNFT = require('../services/modulenft')

const getTraitsOfCollections = async () => {
    setInterval(moduleNFT.collections.getTraits, 6000)
}

module.exports = getTraitsOfCollections
