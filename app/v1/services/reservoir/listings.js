const { sequelize } = require('../../models')
const _ = require('lodash')
const { database } = require('../../utils')
const { listingsChangePercents } = require('../../libs')
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
        const collectionTokens = await sequelize.models.tokens.findAll({
          where: {
            collectionId: collection?.id
          }
        })

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
                entity.event.kind !== 'new-order' ||
                extractMarket(entity.order.source) !== 'opensea'
              )
                continue

              const order = constructOrderObject(
                collection?.id,
                null,
                entity.event.kind,
                entity.order.price,
                entity.order.tokenId,
                entity.metadata?.data?.image || null,
                extractMarket(entity.order.source),
                null,
                getTimestampFromIsoTime(entity.event.createdAt)
              )

              database
                .upsert(
                  order,
                  {
                    collectionId: order.collectionId,
                    allow_buy: false,
                    timestamp: String(order.timestamp),
                    token_id: String(order.token_id)
                  },
                  sequelize.models.listings
                )
                .then(console.log)

              data.push(order)
            } catch (e) {
              console.log(e)
              continue
            }
          }

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

        const calculateListings = await listingsChangePercents.calculate(
          collection?.id,
          data
        )

        if (calculateListings.isSuccess) {
          database
            .upsert(
              calculateListings.data.changePercent,
              {
                collectionId: calculateListings.data.changePercent.collectionId
              },
              sequelize.models.percent_collections
            )
            .then(console.log)
            .catch(console.log)

          database
            .upsert(
              calculateListings.data.change,
              {
                collectionId: calculateListings.data.change.collectionId
              },
              sequelize.models.collections
            )
            .then(console.log)
            .catch(console.log)
        }

        const duplicateOrders = extractDuplicatedOrders(data)

        for (const key of duplicateOrders.tokenIds) {
          const orders = duplicateOrders.data[key]
          for (let k = 1; k < orders.length; k++) {
            const data = relistStructure(
              orders[k].collectionId,
              orders[k].tokenId || null,
              HigherOrLower(orders[k], orders[k - 1]),
              orders[k].price,
              orders[k].market,
              orders[k].token_id,
              orders[k].image_url,
              orders[k].url,
              orders[k].timestamp
            )
            database
              .upsert(
                data,
                {
                  collectionId: orders[k].collectionId,
                  token_id: String(orders[k].token_id),
                  timestamp: String(orders[k].timestamp)
                },
                sequelize.models.relists
              )
              .then(console.log)
              .catch(console.log)
          }
        }
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

const HigherOrLower = (a, b) => {
  if (a.price >= b.price) return 'heigher'
  return 'lower'
}

const relistStructure = (
  collectionId,
  tokenId,
  type,
  price,
  market,
  token_id,
  image_url,
  url,
  timestamp
) => {
  return {
    collectionId,
    tokenId,
    type,
    price,
    market,
    token_id,
    image_url,
    url,
    timestamp
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

  const newTokenIds = []
  const data = {}

  for (const entity of tokenIds) {
    for (const item of orders) {
      if (entity === item.token_id) {
        if (newTokenIds.indexOf(item.token_id) === -1) newTokenIds.push(entity)
        if (_.isEmpty(data[entity])) data[entity] = [item]
        else data[entity].push(item)
      }
    }
  }

  return { data, tokenIds: newTokenIds }
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
  tokenId,
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
    tokenId,
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
