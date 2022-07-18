const openSea = require('../services/opensea')

const getCollectionsStats = () => {
    openSea.stats
        .getStats()
        .then(() => {
            setTimeout(getCollectionsStats, 1500)
        })
        .catch(() => setTimeout(getCollectionsStats, 1500))
}

module.exports = getCollectionsStats
