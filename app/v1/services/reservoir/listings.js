const axios = require('axios')
const { sequelize } = require('../../models')
const theBaseUrl = 'https://api.reservoir.tools/events/orders/v1'
const limit = '1000'

const _ = require('lodash')
const { delay, database } = require('../../utils')
const { changePercent, floor } = require('../../libs')
const { pendings } = require('../collections')

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
      /*
      if (_.isEmpty(findedCollection)) {
        await pendings.savePending(this.#collection)
        throw new Error(
          "We Don't Have This Collection In Our database. So , saved in pending collections to get information"
        )
      }
      */

      let apiKey = await sequelize.models.configurations.findOne({
        where: {
          key: 'ReservoirApiKey'
        }
      })

      apiKey = _.isEmpty(apiKey)
        ? 'f042cd77-177d-4c91-bc1e-2fd4b5dd101a'
        : apiKey?.value

      const allListings = []
      let isFirstRequest = true
      let continuation = ''
      let tryNum = 0

      const resAxiosListings = await axios({
        method: 'get',
        url: isFirstRequest
          ? `${theBaseUrl}?contract=${
              this.#collection
            }&sortDirection=desc&limit=${limit}`
          : `${theBaseUrl}?contract=${
              this.#collection
            }&sortDirection=desc&continuation=${continuation}&limit=${limit}`,
        headers: {
          header: apiKey
        }
      })

      if (resAxiosListings.status !== 200)
        throw new Error("Can't submit request , please try again")

      /*
      while (true) {
        const resAxiosListings = await axios({
          method: 'get',
          url: isFirstRequest
            ? `${theBaseUrl}?contract=${
                this.#collection
              }&sortDirection=desc&limit=${limit}`
            : `${theBaseUrl}?contract=${
                this.#collection
              }&sortDirection=desc&continuation=${continuation}&limit=${limit}`,
          headers: {
            header: apiKey
          }
        })

        if (resAxiosListings.status !== 200)
          throw new Error("Can't submit request , please try again")

        isFirstRequest = false

        allListings.push(resAxiosListings.data.events)

        if (!_.isArray(resAxiosListings.data.events)) break

        continuation = resAxiosListings.data.continuation

        const listingLength = resAxiosListings.data.events.length
        const lastListingTimestamp = getTimestampFromIsoTime(
          resAxiosListings.data.events[listingLength - 1].event.createdAt
        )

        tryNum++
        console.log('------------' + tryNum + '---------')
        console.log(resAxiosListings.data.events)
        console.log('------------' + 'END' + '---------')

        const _14DAY = 1000 * 60 * 60 * 24 * 14

        if (lastListingTimestamp <= Date.now() - _14DAY) break
      }
      */

      let data = resAxiosListings.data.events.filter(
        (item) => item.event.kind === 'new-order'
      )

      data = await Promise.all(data)

      const listings = []
      for (const entity of data) {
        try {
          const data = constructListingObject(
            findedCollection?.id || 1,
            entity.order.price,
            entity.order.tokenId,
            entity.metadata?.data?.image || null,
            entity.order.source,
            entity.event.createdAt
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

      //console.log(listings)

      const calculatedData = await changePercent.calculate(
        findedCollection?.id,
        listings,
        'listings'
      )

      console.log(calculatedData)

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
      console.log(e)
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
  image_url,
  source,
  timestamp
) => {
  return {
    collectionId: collectionId,
    price: price,
    token_id: parseInt(token_id),
    image_url: image_url,
    market: String(source).toLowerCase(),
    timestamp: getTimestampFromIsoTime(timestamp)
  }
}
