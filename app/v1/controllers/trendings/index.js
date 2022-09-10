const { sequelize } = require('../../models')

module.exports.findAll = async (req, res) => {
  try {
    const { ticker } = req.params

    const newTicker = tickerStructure(ticker)

    const attributes = attributesStructure(ticker)

    const findedTrendings = await sequelize.models.collections.findAll({
      where: {
        is_trending: true
      },
      attributes: attributes
    })

    const findedChangePercents =
      await sequelize.models.percent_collections.findAll({})

    const data = []
    for (const entity of findedTrendings)
      data.push({
        contract_address: entity.contract_address,
        collection_name: entity.collection_name,
        collection_slug: entity.collection_name,
        revealed_percentage: entity.revealed_percentage,
        image_url: entity.image_url,
        collection_creation_date: entity.collection_creation_date,
        verified: entity.verified,
        floor_price: entity[`${newTicker}_floor_price`],
        floor_price_change_percent: null,
        volume: entity[`${newTicker}_volume`],
        volume_change_percent: null,
        listings: entity[`${newTicker}_listings`],
        listings_change_percent: null,
        sales: entity[`${newTicker}_sales`],
        sales_change_percent: null,
        market_cap: entity[`${newTicker}_market_cap`],
        market_cap_change_percent: null // entity[`${newTicker}.volume`],
      })

    res.status(200).send({
      statusCode: 200,
      data: data,
      error: null
    })
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      data: null,
      error: e.message
    })
  }
}

const attributesStructure = (ticker) => {
  const newTicker = tickerStructure(ticker)
  return [
    'contract_address',
    'collection_name',
    'revealed_percentage',
    'collection_slug',
    'image_url',
    'collection_creation_date',
    'verified',
    `${newTicker}_floor_price`,
    `${newTicker}_market_cap`,
    `${newTicker}_sales`,
    `${newTicker}_listings`,
    `${newTicker}_volume`
  ]
}

const tickerStructure = (ticker) => {
  switch (ticker) {
    case '1m':
      return 'one_minute'
    case '5m':
      return 'five_minute'
    case '15m':
      return 'fifteen_minute'
    case '1h':
      return 'one_hour'
    case '6h':
      return 'six_hour'
    case '12h':
      return 'twelve_hour'
    case '1d':
      return 'one_day'
    case '7d':
      return 'seven_day'
    default:
      return 'seven_day'
  }
}
