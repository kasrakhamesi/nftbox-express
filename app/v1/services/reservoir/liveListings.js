const _ = require('lodash')
const { sequelize } = require('../../models')
const { database } = require('../../utils')
const { Op } = require('sequelize')
const sdk = require('api')('@reservoirprotocol/v1.0#1fag0v1k3l7sxff82')

const getTimestampFromIsoTime = (isoTime) => {
  let timestamp = String(new Date(isoTime).getTime())
  if (timestamp.length === 10) timestamp = parseInt(timestamp) * 1000
  return timestamp
}

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

    for (const collection of findedCollections) {
      try {
        const findedCollection = await sequelize.models.collections.findByPk(
          collection?.collectionId
        )

        if (_.isEmpty(findedCollection)) continue

        const contractAddress = findedCollection?.contract_address

        sdk.auth(apiKey)

        const r = await sdk.getOrdersAsksV3({
          contracts: contractAddress,
          includePrivate: 'false',
          includeMetadata: 'true',
          includeRawData: 'false',
          sortBy: 'createdAt',
          limit: '1000',
          accept: '*/*'
        })

        for (const entity of r.orders) {
          try {
            const data = constructListingObject(
              collection?.id,
              entity.price.amount.decimal,
              entity.tokenSetId,
              entity.metadata?.data?.image || null,
              true,
              entity.source.url,
              entity.createdAt
            )

            await database.upsert(
              data,
              {
                collectionId: collection?.id,
                token_id: extractTokenId(entity.tokenSetId)
              },
              sequelize.models.listings
            )
          } catch {
            continue
          }
        }
      } catch {
        continue
      }
    }
  } catch (e) {
    return {
      status: 400,
      content: {
        message: e.message
      }
    }
  }
}

const extractTokenId = (token) => {
  return token.split(':')[2]
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

const constructListingObject = (
  collectionId,
  price,
  token_id,
  image_url,
  allowBuy,
  source,
  timestamp
) => {
  return {
    collectionId,
    price,
    token_id: extractTokenId(token_id),
    image_url,
    allow_buy: allowBuy,
    market: extractMarket(source),
    timestamp: getTimestampFromIsoTime(timestamp)
  }
}

module.exports = { Get }
