const axios = require('axios')
const { sequelize } = require('../../models')
const sdk = require('api')('@reservoirprotocol/v1.0#1fag0v1k3l7sxff82')
const _ = require('lodash')
const { delay, database } = require('../../utils')
const { changePercent } = require('../../libs')
const { pendings } = require('../collections')

const Get = async () => {
  try {
    const findedCollections = await sequelize.models.collections.findAll({
      where: {
        checked_tarits: true
      }
    })

    let apiKey = await sequelize.models.configurations.findOne({
      where: {
        key: 'ReservoirApiKey'
      }
    })

    apiKey = _.isEmpty(apiKey)
      ? 'f042cd77-177d-4c91-bc1e-2fd4b5dd101a'
      : apiKey?.value

    sdk.auth(apiKey)

    const r = await sdk.getSalesV4({
      contract: 'a',
      limit: '1000',
      accept: '*/*'
    })

    let sales = []

    for (const entity of r.sales) {
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

const timestampStructure = (timestamp) => {
  timestamp = String(timestamp)
  if (timestamp.length === 10) timestamp = parseInt(timestamp) * 1000
  return timestamp
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
    timestamp: timestampStructure(data?.timestamp)
  }
}

module.exports = {
  Get
}
