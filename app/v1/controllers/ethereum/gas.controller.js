const { sequelize } = require('../../models')

const getGas = (req, res) => {
  return sequelize.models.gas_stations
    .findOne({
      where: {
        id: 1
      }
    })
    .then((r) => {
      return res.status(200).send({
        statusCode: 200,
        data: {
          gas: r.high || 60
        },
        error: null
      })
    })
    .catch((e) => {
      return res.status(400).send({
        statusCode: 400,
        data: null,
        error: e.message
      })
    })
}

module.exports = { getGas }
