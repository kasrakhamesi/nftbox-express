const reservoir = require('../services/reservoir')

const getSales = () => {
  reservoir.sales
    .Get()
    .then(() => {
      setTimeout(getSales, 10000)
    })
    .catch(() => setTimeout(getSales, 10000))
}

module.exports = getSales
