const openSea = require('../services/opensea')

const getCollectionsStats = () => {
    setInterval(openSea.stats.getStats, 1500)
}

module.exports = getCollectionsStats
