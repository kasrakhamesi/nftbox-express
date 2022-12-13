const { etherscan } = require('../services')

const updateNetworkFee = () => {
  etherscan.gasTracker
    .setNetworkFee()
    .then(() => {
      setTimeout(updateNetworkFee, 1000 * 2)
    })
    .catch(() => setTimeout(updateNetworkFee, 1000 * 2))
}

module.exports = updateNetworkFee
