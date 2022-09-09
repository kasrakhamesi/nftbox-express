const axios = require('axios')
const { sequelize } = require('../../models')
const theBaseUrl = 'https://api.reservoir.tools/sales/v4'
const limit = '1000'

const _ = require('lodash')
const { delay, database } = require('../../utils')
const { changePercent } = require('../../libs')
const { pendings } = require('../collections')

const getChangePercent = async () => {
  try {
    const collections = await sequelize.models.collections.findAll()
    for (let collection of collections) {
      try {
        await delay.wait(100)
        await new Get(collection, false)
      } catch (e) {
        continue
      }
    }
  } catch (e) {
    console.log(e)
  }
}

const Get = async (collection, checkContract = true) => {
  try {
    let contractAddress = ''
    let collectionId = ''

    if (checkContract) {
      const findedCollection = await sequelize.models.collections.findOne({
        where: {
          contract_address: contractAddress
        }
      })

      if (_.isEmpty(findedCollection)) {
        await pendings.savePending(findedCollection?.contract_address)
        throw new Error(
          "We Don't Have This Collection In Our database. So , saved in pending collections to get information"
        )
      }

      contractAddress = findedCollection.contract_address
      collectionId = findedCollection?.id
    } else {
      contractAddress = collection?.contract_address
      collectionId = collection?.id
    }

    let apiKey = await sequelize.models.configurations.findOne({
      where: {
        key: 'ReservoirApiKey'
      }
    })

    apiKey = _.isEmpty(apiKey)
      ? 'f042cd77-177d-4c91-bc1e-2fd4b5dd101a'
      : apiKey?.value

    const resAxiosSales = await axios({
      method: 'get',
      url: `${theBaseUrl}?contract=${contractAddress}&limit=${limit}&includeTokenMetadata=true`,
      headers: {
        header: apiKey
      }
    })

    if (resAxiosSales.status !== 200)
      throw new Error("Can't submit request , please try again")

    let sales = []

    for (const entity of resAxiosSales.data.sales) {
      try {
        const data = constructSalesObject(collectionId, entity)
        sales.push(data)
        await database.upsert(
          data,
          { collectionId: collectionId },
          sequelize.models.sales
        )
      } catch (e) {
        continue
      }
    }

    sales = await Promise.all(sales)

    const calculatedData = await changePercent.calculate(
      collectionId,
      sales,
      'sales'
    )
    console.log(calculatedData)
    /*
      if (calculatedData.isSuccess) {
        await database.upsert(
          calculatedData.data,
          {
            collectionId: collectionId
          },
          sequelize.models.percent_collections
        )
      }
*/
    //floor.calculate(1, listings)

    return {
      status: 200,
      content: {
        data: null
      }
    }
  } catch (e) {
    console.log(e)
    return {
      status: 400,
      content: {
        message: e.message
      }
    }
  }
}

const constructSalesObject = (collectionId, data) => {
  return {
    collectionId: collectionId,
    market: String(data?.orderSource).split('.')[0],
    price: data?.price?.amount?.decimal,
    token_id: parseInt(data?.token?.tokenId),
    amount: data?.amount,
    image_url: data?.token?.image,
    url: '',
    tx_hash: data?.txHash,
    timestamp: parseInt(data?.timestamp * 1e3)
  }
}

module.exports = {
  Get,
  getChangePercent
}
