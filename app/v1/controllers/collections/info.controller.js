const { sequelize } = require('../../models')
const { Op } = require('sequelize')
const _ = require('lodash')

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
        'logo_url',
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
