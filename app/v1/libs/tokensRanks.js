const { sequelize } = require('../models')
const _ = require('lodash')

module.exports.calculate = async () => {
  const findedCollections = await sequelize.models.collections.findAll({
    where: {
      checked_traits: true
    }
  })
  for (const collection of findedCollections) {
    try {
      const findedTokens = await sequelize.models.tokens.findAll({
        where: {
          collectionId: collection.id
        }
      })
    } catch (e) {
      continue
    }
  }
}
