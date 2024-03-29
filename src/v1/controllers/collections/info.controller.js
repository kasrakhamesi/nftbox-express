const { sequelize } = require('../../models')
const { Op } = require('sequelize')
const _ = require('lodash')

const include = [
  {
    model: sequelize.models.collections,
    as: 'collection',
    include: {
      attributes: [['contract_address', 'collection_slug']]
    }
  }
]

module.exports.relists = async (req, res) => {
  try {
    const r = await sequelize.models.relists.findAll()
    res.send(r)
  } catch (e) {
    res.send(e)
  }
}

module.exports.getRelists = async (req, res) => {
  try {
    const { collection } = req.params
    const where =
      collection.substring(0, 2) !== '0x'
        ? { collection_slug: collection } //checked_tarits: true }
        : { contract_address: collection } //checked_tarits: true }

    const findedCollection = await sequelize.models.collections.findOne({
      where
    })

    if (!findedCollection) throw new Error('Collection Not Found')

    const relists = await sequelize.models.relists.findAll({
      where: {
        collectionId: findedCollection?.id
      },
      attributes: [
        'type',
        'price',
        'market',
        'token_id',
        'image_url',
        'url',
        'timestamp'
      ]
    })

    res.status(200).send({
      statusCode: 200,
      data: relists,
      error: null
    })
  } catch (e) {
    res.status(400).send({
      statusCode: 400,
      data: null,
      error: e?.message || String(e)
    })
  }
}

module.exports.floorPrices = async (req, res) => {
  try {
    const { collection } = req.params
    const where =
      collection.substring(0, 2) !== '0x'
        ? { collection_slug: collection } //checked_tarits: true }
        : { contract_address: collection } //checked_tarits: true }

    const findedCollection = await sequelize.models.collections.findOne({
      where
    })

    if (!findedCollection) throw new Error('Collection Not Found')

    const r = await sequelize.models.floor_prices.findAll({
      attributes: ['price', 'createdAt'],
      where: {
        collectionId: findedCollection?.id
      }
    })
    res.status(200).send({
      statusCode: 200,
      data: r,
      error: null
    })
  } catch (e) {
    return res.status(400).send({
      statusCode: 400,
      data: null,
      error: e?.message || String(e)
    })
  }
}

module.exports.listings = async (req, res) => {
  const r = await sequelize.models.listings.findAll({
    order: [['timestamp', 'desc']],
    include: {
      model: sequelize.models.collections,
      as: 'collection',
      attributes: [['collection_slug', 'contract_address']]
    }
  })
  res.send(r)
}

module.exports.sales = async (req, res) => {
  const r = await sequelize.models.sales.findAll()
  res.send(r)
}

module.exports.tokens = async (req, res) => {
  const r = await sequelize.models.tokens.findAll()
  res.send(r)
}

module.exports.c = async (req, res) => {
  const r = await sequelize.models.collections.findAll({
    attributes: [
      'id',
      'contract_address',
      'collection_slug',
      'collection_name',
      'revealed_percentage',
      'collection_creation_date',
      'banner_image_url',
      'image_url',
      'verified',
      'instagram_url',
      'twitter_url',
      'discord_url',
      'website_url',
      'telegram_url',
      'description',
      'nft_royalty',
      'sales_volume',
      'volume_traded',
      'floor_price',
      'percent_owner',
      'checked_tarits',
      'owners_count',
      'total_supply',
      'average_price',
      'numeric_traits',
      'string_traits',
      'opensea_url',
      'x2y2_url',
      'looksrare_url'
    ]
  })
  res.send(r)
}

module.exports.findOne = async (req, res) => {
  try {
    const { collection } = req.params
    const condition =
      collection.substring(0, 2) !== '0x'
        ? { collection_slug: collection } //checked_tarits: true }
        : { contract_address: collection } //checked_tarits: true }

    const findedCollection = await sequelize.models.collections.findOne({
      where: condition,
      attributes: [
        'contract_address',
        'collection_slug',
        'collection_name',
        'revealed_percentage',
        'collection_creation_date',
        'banner_image_url',
        'image_url',
        'verified',
        'instagram_url',
        'twitter_url',
        'discord_url',
        'website_url',
        'telegram_url',
        'description',
        'nft_royalty',
        'sales_volume',
        'volume_traded',
        'floor_price',
        'percent_owner',
        'owners_count',
        'total_supply',
        'average_price',
        'numeric_traits',
        'string_traits',
        'opensea_url',
        'x2y2_url',
        'looksrare_url'
      ]
    })

    if (_.isEmpty(findedCollection))
      throw new Error("Invalid Collection or can't find this collection")

    findedCollection.dataValues.etherscan_url = `https://etherscan.io/token/${findedCollection?.contract_address}`

    res.status(200).send({
      statusCode: 200,
      data: findedCollection,
      error: null
    })
  } catch (e) {
    res.status(400).send({
      statusCode: 400,
      data: null,
      error: e.message
    })
  }
}

module.exports.search = async (req, res) => {
  try {
    const { collection } = req.params

    const findedCollections = await sequelize.models.collections.findAll({
      where: {
        [Op.or]: [
          {
            contract_address: { [Op.like]: `%${collection}%` }
          },
          {
            collection_slug: { [Op.like]: `%${collection}%` }
          },
          {
            collection_name: { [Op.like]: `%${collection}%` }
          }
        ]
      },
      attributes: [
        'contract_address',
        'collection_name',
        'collection_slug',
        'revealed_percentage',
        'image_url',
        'verified'
      ]
    })

    res.status(200).send({
      statusCode: 200,
      data: findedCollections,
      error: null
    })
  } catch (e) {
    res.status(400).send({
      statusCode: 400,
      data: null,
      error: e.message
    })
  }
}
