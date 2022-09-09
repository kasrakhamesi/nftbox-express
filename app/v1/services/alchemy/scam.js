const axios = require('axios')
const { sequelize } = require('sequelize')
const _ = require('lodash')

module.exports.checkScamToken = async (contractAddress) => {
  try {
    let apiKey = await sequelize.models.configurations.findOne({
      where: {
        key: 'AlchemyApiKey'
      }
    })

    apiKey = _.isEmpty(apiKey)
      ? 'c8XCRD_56zo2QvYijbbPfaw6AgZ9X-e0 '
      : apiKey?.value

    const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/isSpamContract`

    const config = {
      method: 'get',
      url: `${baseURL}?contractAddress=${contractAddress}`,
      headers: {}
    }

    /*
    axios(config)
      .then((response) => console.log(JSON.stringify(response.data, null, 2)))
      .catch((error) => console.log(error))
*/
    return {
      statusCode: 200,
      data: {
        isSpam: true
      },
      error: null
    }
  } catch (e) {
    return {
      statusCode: 400,
      data: null,
      error: {
        message: e.message
      }
    }
  }
}
