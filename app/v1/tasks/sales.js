const reservoir = require('../services/reservoir')

const getSales = () => {
  reservoir.sales
    .getSalesChangePercent()
    .then(() => {
      setTimeout(getSales, 10000)
    })
    .catch(() => setTimeout(getSales, 10000))
}

module.exports = getSales
