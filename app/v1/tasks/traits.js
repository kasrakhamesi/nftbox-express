const { modulenft } = require('../services')

const getTraits = () => {
  modulenft.collections
    .getTraits()
    .then(() => {
      setTimeout(getTraits, 6000)
    })
    .catch(() => setTimeout(getTraits, 6000))
}

module.exports = getTraits
