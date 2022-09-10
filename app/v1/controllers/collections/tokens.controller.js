const { sequelize } = require('../../models')
const _ = require('lodash')

module.exports.findOne = async (req, res) => {
  try {
    const { collection, tokenId } = req.params
    const condition =
      collection.substring(0, 2) !== '0x'
        ? { collection_slug: collection }
        : { contract_address: collection }

    const findedCollection = await sequelize.models.collections.findOne({
      where: condition
    })

    if (_.isEmpty(findedCollection))
      throw new Error("Can't find this collection")

    const findedToken = await sequelize.models.tokens.findOne({
      where: { collectionId: findedCollection.id, token_id: tokenId },
      attributes: {
        exclude: ['collectionId', 'createdAt', 'updatedAt']
      }
    })

    if (_.isEmpty(findedToken)) {
      /*
      const r = await sequelize.models.tokens.findAll()
      return res.status(200).send(r)
      */
      throw new Error("Can't find this token with collection and token id")
    }

    res.status(200).send({
      statusCode: 200,
      data: findedToken,
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
