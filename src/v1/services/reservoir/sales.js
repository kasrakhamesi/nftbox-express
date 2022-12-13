const { sequelize } = require('../../models')
const sdk = require('api')('@reservoirprotocol/v1.0#1fag0v1k3l7sxff82')
const _ = require('lodash')
const { database } = require('../../utils')
const { saleVolumeCounts } = require('../../libs')

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

    for (const collection of findedCollections) {
      try {
        let data = []
        let continuation = null
        let lastSaleTimestamp
        let _14DAY_AGO_TIMESTAMP
        do {
          const body = {
            contract: collection?.contract_address,
            includeTokenMetadata: 'true',
            limit: '1000',
            accept: '*/*'
            //continuation: '',
          }

          if (continuation !== null) body.continuation = continuation

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
              .upsert(sale, { tx_hash: entity?.txHash }, sequelize.models.sales)
              .then(console.log)
              .catch(console.log)

            data.push(sale)
          }

          lastSaleTimestamp = timestampStructure(
            r.sales[r.sales.length - 1].timestamp
          )
          const _14DAY = 1000 * 60 * 60 * 24 * 14

          _14DAY_AGO_TIMESTAMP = parseInt(Date.now() - _14DAY)

          continuation = r?.continuation || null
        } while (
          continuation !== null &&
          parseInt(lastSaleTimestamp) >= _14DAY_AGO_TIMESTAMP
        )

        data = await Promise.all(data)

        const calculateCountsAndPercents = await saleVolumeCounts.calculate(
          collection?.contract_address,
          collection?.id,
          data
        )

        if (calculateCountsAndPercents.isSuccess) {
          database
            .upsert(
              calculateCountsAndPercents.data.sales.changePercent,
              {
                collectionId:
                  calculateCountsAndPercents.data.sales.changePercent
                    .collectionId
              },
              sequelize.models.percent_collections
            )
            .then(console.log)
            .catch(console.log)

          database
            .upsert(
              calculateCountsAndPercents.data.sales.count,
              {
                contract_address:
                  calculateCountsAndPercents.data.sales.count.contract_address
              },
              sequelize.models.collections
            )
            .then(console.log)
            .catch(console.log)

          database
            .upsert(
              calculateCountsAndPercents.data.volume.changePercent,
              {
                collectionId:
                  calculateCountsAndPercents.data.volume.changePercent
                    .collectionId
              },
              sequelize.models.percent_collections
            )
            .then(console.log)
            .catch(console.log)

          database
            .upsert(
              calculateCountsAndPercents.data.volume.count,
              {
                contract_address:
                  calculateCountsAndPercents.data.volume.count.contract_address
              },
              sequelize.models.collections
            )
            .then(console.log)
            .catch(console.log)
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

module.exports = {
  Get
}
