const { reservoir } = require('../services')

const getLiveSales = () => {
  reservoir.liveSales
    .Get()
    .then(() => {
      setTimeout(getLiveSales, 1000)
    })
    .catch(() => setTimeout(getLiveSales, 1000))
}

module.exports = getLiveSales
