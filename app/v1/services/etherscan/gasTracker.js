const axios = require('axios')
const { sequelize } = require('../../models')
const { database } = require('../../utils')

const getNetworkFee = async () => {
  try {
    const resGas = await axios.get(
      'https://api.etherscan.io/api?module=gastracker&action=gasoracle'
    )
    if (resGas.status === 200 && resGas.data?.status === '1')
      return resGas.data?.result?.FastGasPrice

    return 60
  } catch {
    return 60
  }
}

const setNetworkFee = async () => {
  try {
    const networkFee = await getNetworkFee()
    await database.upsert(
      {
        high: networkFee
      },
      {
        id: 1
      },
      sequelize.models.gas_stations
    )
  } catch (err) {
    console.log(err)
  }
}

module.exports = { setNetworkFee }
