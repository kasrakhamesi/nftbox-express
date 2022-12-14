const { sequelize } = require('../../models')
const { database } = require('../../utils')
const _ = require('lodash')

const collectionCondition = (collection) => {
  const condition =
    collection.substring(0, 2) !== '0x'
      ? { collection_slug: collection }
      : { contract_address: collection }

  return condition
}

module.exports.findAll = async (req, res) => {
  try {
    const { collection } = req.params

    const condition = collectionCondition(collection)
    const findedCollection = await sequelize.models.collections.findOne({
      where: condition
    })
    if (_.isEmpty(findedCollection)) throw new Error("Can't find Collection")

    const listings = await sequelize.models.listings.findAll({
      where: {
        collectionId: findedCollection?.id,
        allow_buy: true
      },
      limit: 300,
      attributes: {
        exclude: [
          'id',
          'tokenId',
          'collectionId',
          'allow_buy',
          'createdAt',
          'updatedAt'
        ]
      }
    })

    const newData = []

    const mockData = {
      token_id: null,
      token_name: null,
      token_url: null,
      token_description: null,
      string_traits: null,
      numeric_traits: null,
      basic_rank: null,
      normal_rank: null,
      weight_rank: null,
      token_image: null,
      weight_property: null,
      normal_property: null,
      basic_property: null
    }

    for (const listing of listings) {
      const token = await sequelize.models.tokens.findOne({
        where: {
          collectionId: findedCollection?.id,
          token_id: listing.token_id
        },
        attributes: {
          exclude: [
            'id',
            'collectionId',
            'createdAt',
            'updatedAt',
            'basic_score',
            'normal_score',
            'weight_score'
          ]
        }
      })

      newData.push({
        ...listing.dataValues,
        meta: {
          ...(token.dataValues || mockData),
          basic_property: 'common',
          normal_property: 'common',
          weight_property: 'legendary'
        }
      })
    }

    res.status(200).send({
      statusCode: 200,
      data: newData,
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

module.exports.create = async (req, res) => {
  try {
    const { collection } = req.params
    const condition =
      collection.substring(0, 2) !== '0x'
        ? { collection_slug: collection }
        : { contract_address: collection }

    const findedCollection = await sequelize.models.collections.findOne({
      where: condition
    })

    if (_.isEmpty(findedCollection))
      throw new Error("Can't find this collection in our database")

    await database.upsert(
      { collectionId: findedCollection?.id, expire: Date.now() + 1000 * 15 },
      { collectionId: findedCollection?.id },
      sequelize.models.live_collections
    )

    res.status(200).send({
      statusCode: 200,
      data: {
        isSuccess: true,
        message: 'Start Listing to this contract'
      },
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
