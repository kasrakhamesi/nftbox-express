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
      limit: 310,
      attributes: {
        exclude: ['id', 'tokenId', 'collectionId', 'createdAt', 'updatedAt']
      }
    })

    const newData = []

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
        meta: { ...token.dataValues, normal_property, basic_property: 'common' }
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
