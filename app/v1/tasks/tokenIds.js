const moduleNFT = require('../services/modulenft')

const getTokenIds = () => {
    setInterval(moduleNFT.tokens.getTokenIds, 6000)
}

module.exports = getTokenIds
