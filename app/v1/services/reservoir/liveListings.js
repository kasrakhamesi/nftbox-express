const axios = require('axios')
const _ = require('lodash')
const { sequelize } = require('../../models')
const { database } = require('../../utils')

const sortBy = 'createdAt'
const theBaseUrl = 'https://api.reservoir.tools/orders/asks/v2'
const limit = '1000'

const getTimestampFromIsoTime = (isoTime) => {
  return new Date(isoTime).getTime()
}

const Get = async () => {
  try {
    const findedCollections = await sequelize.models.live_listings.findAll()

    for (const collection in findedCollections) {
      try {
        let apiKey = await sequelize.models.configurations.findOne({
          where: {
            key: 'ReservoirApiKey'
          }
        })

        const findedCollection = await sequelize.models.collections.findByPk(
          collection?.id
        )

        if (_.isEmpty(findedCollection)) continue

        const contractAddress = findedCollection?.contract_address

        apiKey = _.isEmpty(apiKey)
          ? 'f042cd77-177d-4c91-bc1e-2fd4b5dd101a'
          : apiKey?.value

        const resAxiosListings = await axios({
          method: 'get',
          url: `${theBaseUrl}?contracts=${contractAddress}&sortBy=${sortBy}&limit=${limit}`,
          headers: {
            header: apiKey
          }
        })

        if (resAxiosListings.status !== 200)
          throw new Error("Can't submit request , please try again")

        for (const entity of resAxiosListings.data.orders) {
          try {
            const data = constructListingObject(
              collection?.id,
              entity.price,
              entity.tokenSetId,
              entity.metadata?.data?.image || null,
              entity.source.url,
              entity.createdAt
            )

            await database.upsert(
              data,
              { collectionId: collection?.id },
              sequelize.models.listings
            )
          } catch (e) {
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

const constructListingObject = (
  collectionId,
  price,
  token_id,
  image_url,
  source,
  timestamp
) => {
  return {
    collectionId: collectionId,
    price: price,
    token_id: extractTokenId(token_id),
    image_url: image_url,
    market: String(source).toLowerCase(),
    timestamp: getTimestampFromIsoTime(timestamp)
  }
}

module.exports = { Get }
