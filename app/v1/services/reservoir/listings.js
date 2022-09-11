const { sequelize } = require('../../models')
const _ = require('lodash')
const { database } = require('../../utils')
const { changePercent, listingsChangePercents } = require('../../libs')
const sdk = require('api')('@reservoirprotocol/v1.0#1fag0v1k3l7sxff82')

const getTimestampFromIsoTime = (isoTime) => {
  let timestamp = new Date(isoTime).getTime()
  timestamp = String(timestamp)
  if (timestamp.length === 10) timestamp = parseInt(timestamp) * 1000
  return parseInt(timestamp)
}

const Get = async () => {
  try {
    const findedCollections = await sequelize.models.collections.findAll()
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

    sdk.auth(apiKey)

    for (const collection of findedCollections) {
      try {
        let data = []
        let continuation = null
        let lastOrderTimestamp
        let _14DAY_AGO_TIMESTAMP
        do {
          const body = {
            contract: collection?.contract_address,
            sortDirection: 'desc',
            limit: '1000',
            accept: '*/*'
            //continuation: '',
          }

          if (continuation !== null) body.continuation = continuation

          const r = await sdk.getEventsOrdersV1(body)

          for (const entity of r.events) {
            try {
              if (
                entity.event.kind === 'sale' &&
                extractMarket(entity.order.source) !== 'opensea'
              )
                continue

              const order = constructOrderObject(
                collection?.id,
                entity.event.kind,
                entity.order.price,
                entity.order.tokenId,
                entity.metadata?.data?.image || null,
                extractMarket(entity.order.source),
                null,
                getTimestampFromIsoTime(entity.event.createdAt)
              )
              if (order.kind === 'new-order') {
                /*
                database
                  .upsert(
                    order,
                    {
                      collectionId: order.collectionId,
                      allow_buy: false,
                      timestamp: order.timestamp,
                      token_id: order.token_id
                    },
                    sequelize.models.listings
                  )
                  .then(console.log)
                  .catch(console.log)
                  */
              }
              data.push(order)
            } catch (e) {
              console.log(e)
              continue
            }
          }
          break

          lastOrderTimestamp = getTimestampFromIsoTime(
            r.events[r.events.length - 1].event.createdAt
          )

          const _14DAY = 1000 * 60 * 60 * 24 * 14

          _14DAY_AGO_TIMESTAMP = parseInt(Date.now() - _14DAY)

          continuation = r?.continuation || null
        } while (
          continuation !== null &&
          parseInt(lastOrderTimestamp) >= _14DAY_AGO_TIMESTAMP
        )

        data = await Promise.all(data)

        const duplicateOrders = extractDuplicatedOrders(data)

        console.log(duplicateOrders.tokenIds)
        console.log(duplicateOrders.orders)

        for (const entity of duplicateOrders.tokenIds) {
          for (const item of duplicateOrders.orders) {
            if (entity === item.token_id) console.log(item)
          }
        }

        //console.log(duplicateOrders)

        /*
        const calculatedChanges = await listingsChangePercents.calculate(
          collection?.id,
          data
        )

        if (calculatedChanges.isSuccess) {
        }
        */
      } catch (e) {
        console.log(e)
        continue
      }
    }

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

const GetDuplicates = (data) => {
  const keys = ['token_id']
  const map = data.reduce((m, o) => {
      const key = keys.map((k) => JSON.stringify(o[k])).join('|'),
        [count = 0, array = []] = m.get(key) || []
      return m.set(key, [count + 1, [...array, o]])
    }, new Map()),
    duplicates = Array.from(map.values(), ([count, array]) =>
      count === 1 ? [] : array
    ).flat()

  return duplicates
}

const extractDuplicatedOrders = (orders) => {
  orders = GetDuplicates(orders)
  const tokenIds = []
  for (const order of orders) {
    tokenIds.push(order.token_id)
  }

  return { orders, tokenIds }
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

const constructOrderObject = (
  collectionId,
  kind,
  price,
  token_id,
  image_url,
  source,
  url,
  timestamp
) => {
  return {
    collectionId: collectionId,
    kind,
    price: price,
    token_id: parseInt(token_id),
    image_url,
    market: extractMarket(source),
    url,
    timestamp: getTimestampFromIsoTime(timestamp)
  }
}

module.exports = { Get }
