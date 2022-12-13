const alchemy = require('../services/alchemy')

const getTokensId = () => {
  alchemy.tokens
    .getTokensId()
    .then(() => {
      setTimeout(getTokensId, 6000)
    })
    .catch(() => setTimeout(getTokensId, 6000))
}

module.exports = getTokensId
