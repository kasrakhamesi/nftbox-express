const reservoir = require('../services/reservoir')

const getLiveListings = () => {
  reservoir.liveListings
    .Get()
    .then(() => {
      setTimeout(getLiveListings, 10000)
    })
    .catch(() => setTimeout(getLiveListings, 10000))
}

module.exports = getLiveListings
