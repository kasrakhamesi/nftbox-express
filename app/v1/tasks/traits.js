const moduleNFT = require('../services/modulenft')

const getTraits = () => {
    setInterval(moduleNFT.collections.getTraits, 6000)
}

module.exports = getTraits
