const { sequelize } = require('../../models')
const { database } = require('../../utils')
const _ = require('lodash')

module.exports.create = async (req, res) => {
  try {
    const { collection } = req.body
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
    console.log(e)
    res.status(400).send({
      statusCode: 400,
      data: null,
      error: e.message
    })
  }
}
