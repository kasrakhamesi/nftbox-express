const moduleNFT = require('../services/modulenft')

const getTraits = () => {
    moduleNFT.collections
        .getTraits()
        .then(() => {
            setTimeout(getTraits, 6000)
        })
        .catch(() => setTimeout(getTraits, 6000))
}

module.exports = getTraits
