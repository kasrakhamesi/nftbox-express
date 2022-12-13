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

    const sales = await sequelize.models.sales.findAll({
      where: {
        collectionId: findedCollection?.id
        // allow_buy: allowBuy : false
      },
      limit: 300,
      attributes: {
        exclude: ['id', 'tokenId', 'collectionId', 'createdAt', 'updatedAt']
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

    for (const sale of sales) {
      const token = await sequelize.models.tokens.findOne({
        where: {
          collectionId: findedCollection?.id,
          token_id: sale.token_id
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
        ...sale.dataValues,
        market_url: 'https://opensea.io',
        meta: {
          ...(token.dataValues || mockData),
          normal_property,
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
