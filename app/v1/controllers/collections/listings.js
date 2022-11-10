const { sequelize } = require('../../models')
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

    //TODO DELETE RELATION

    const listings = await sequelize.models.listings.findAll({
      where: {
        collectionId: findedCollection?.id
        // allow_buy: allowBuy : false
      },
      limit: 30,
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
          ...token.dataValues,
          basic_property: 'common',
          normal_property: 'common',
          weight_property: 'legendry'
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
