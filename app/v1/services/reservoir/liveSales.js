const { sequelize } = require('../../models')
const _ = require('lodash')
const { database } = require('../../utils')
const { Op } = require('sequelize')
const sdk = require('api')('@reservoirprotocol/v1.0#1fag0v1k3l7sxff82')

const Get = async () => {
  try {
    const findedCollections = await sequelize.models.live_collections.findAll({
      where: {
        expire: { [Op.gt]: String(Date.now()) }
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

    for (const collection of findedCollections) {
      try {
        const findedCollection = await sequelize.models.collections.findByPk(
          collection?.collectionId
        )

        if (_.isEmpty(findedCollection)) continue

        const body = {
          contract: collection?.contract_address,
          includeTokenMetadata: 'true',
          limit: '1000',
          accept: '*/*'
        }

        const r = await sdk.getSalesV4(body)

        for (const entity of r.sales) {
          const sale = constructSalesObject(
            collection?.id,
            extractMarket(entity?.orderSource),
            entity?.price?.amount?.decimal,
            entity?.token?.tokenId,
            entity?.amount,
            entity?.token?.image || null,
            null,
            entity?.txHash,
            entity?.timestamp
          )
          database
            .upsert(data, { tx_hash: entity?.txHash }, sequelize.models.sales)
            .then(console.log)
            .catch(console.log)
        }
      } catch (e) {
        console.log(e)
        continue
      }
    }
  } catch (e) {
    console.log(e)
  }
}

const extractMarket = (source) => {
  source = String(source).toLowerCase()
  return source.includes('opensea')
    ? 'opensea'
    : source.includes('x2y2')
    ? 'x2y2'
    : source.includes('looksrare')
    ? 'looksrare'
    : 'opensea'
}

const timestampStructure = (timestamp) => {
  timestamp = String(timestamp)
  if (timestamp.length === 10) timestamp = parseInt(timestamp) * 1000
  return parseInt(timestamp)
}

const constructSalesObject = (
  collectionId,
  market,
  price,
  token_id,
  amount,
  image_url,
  url,
  tx_hash,
  timestamp
) => {
  return {
    collectionId,
    market,
    price,
    token_id: parseInt(token_id),
    amount,
    image_url,
    url,
    tx_hash,
    timestamp: timestampStructure(timestamp)
  }
}

module.exports = { Get }
