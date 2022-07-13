const alchemy = require('../services/alchemy')

const getTokensId = () => {
    console.log('are')
    alchemy.tokens
        .getTokensId()
        .then(() => {
            console.log('b')
            setTimeout(getTokensId, 6000)
        })
        .catch(() => setTimeout(getTokensId, 6000))
}

module.exports = getTokensId
