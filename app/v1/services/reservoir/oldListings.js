const axios = require('axios')
const { sequelize } = require('../../models')
const theBaseUrl = 'https://api.reservoir.tools/orders/asks/v2'
const sortBy = 'createdAt'
const limit = '1000'

const _ = require('lodash')
const { delay, database } = require('../../utils')
const { changePercent, floor } = require('../../libs')

const getTimestampFromIsoTime = (isoTime) => {
  return new Date(isoTime).getTime()
}

module.exports.getListingsChangePercent = async () => {
  try {
    const collections = await sequelize.models.collections.findAll()
    for (let collection of collections) {
      try {
        await delay.wait(100)
        await new this.GetListings(collection.contract_address).save()
      } catch (e) {
        continue
      }
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports.GetListings = class {
  #collection
  constructor(collection) {
    this.#collection = collection
  }
  save = async () => {
    try {
      const findedCollection = await sequelize.models.collections.findOne({
        where: {
          contract_address: this.#collection
        }
      })

      if (_.isEmpty(findedCollection)) {
        await pendingCollections.savePending(this.#collection)
        throw new Error(
          "We Don't Have This Collection In Our database. So , saved in pending collections to get information"
        )
      }

      let apiKey = await sequelize.models.configurations.findOne({
        where: {
          key: 'ReservoirApiKey'
        }
      })

      apiKey = _.isEmpty(apiKey)
        ? 'f042cd77-177d-4c91-bc1e-2fd4b5dd101a'
        : apiKey?.value

      const resAxiosListings = await axios({
        method: 'get',
        url: `${theBaseUrl}?contracts=${
          this.#collection
        }&sortBy=${sortBy}&limit=${limit}`,
        headers: {
          header: apiKey
        }
      })

      if (resAxiosListings.status !== 200)
        throw new Error("Can't submit request , please try again")

      let listings = []
      for (const entity of resAxiosListings.data.orders) {
        try {
          const data = constructListingObject(
            findedCollection?.id,
            entity.price,
            entity.tokenSetId,
            false,
            entity.metadata?.data?.image || null,
            entity.source.url,
            entity.createdAt
          )
          listings.push(data)

          await database.upsert(
            data,
            { collectionId: findedCollection?.id },
            sequelize.models.listings
          )
        } catch (e) {
          continue
        }
      }

      const calculatedData = await changePercent.calculate(
        findedCollection?.id,
        listings
      )

      if (calculatedData.isSuccess) {
        await database.upsert(
          calculatedData.data,
          {
            collectionId: findedCollection.id
          },
          sequelize.models.percent_collections
        )
      }

      //floor.calculate(1, listings)

      return {
        status: 200,
        content: {
          data: null
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
}

const extractTokenId = (token) => {
  return token.split(':')[2]
}

const constructListingObject = (
  collectionId,
  price,
  token_id,
  is_delist,
  image_url,
  opensea_url,
  timestamp
) => {
  return {
    collectionId: collectionId,
    price: price,
    token_id: extractTokenId(token_id),
    is_delist: is_delist,
    image_url: image_url,
    opensea_url: opensea_url,
    timestamp: getTimestampFromIsoTime(timestamp)
  }
}
