const reservoir = require('../services/reservoir')

const getLiveListings = () => {
  reservoir.liveListings
    .Get()
    .then(() => {
      setTimeout(getLiveListings, 1000)
    })
    .catch(() => setTimeout(getLiveListings, 1000))
}

module.exports = getLiveListings
