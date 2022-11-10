const axios = require('axios')
const { sequelize } = require('../../models')
const { delay } = require('../../utils')
require('dotenv').config()

const getCollectionsTraits = async () => {
  const findedCollections = await sequelize.models.collections.findAll({
    where: {
      string_traits: null,
      numeric_traits: null,
      checked_tarits: false
    }
  })

  for (const collection of findedCollections) {
    getTraits(collection?.collection_slug)
      .then(console.log)
      .catch((e) => console.log(e))
  }
}

const getTraits = async (collectionSlug) => {
  try {
    const r = await axios.get(
      `${process.env.OPENSEA_BASEURL}/collection/${collectionSlug}`
    )
    await delay.wait(1000)
    const data = r.data
    const traits = data?.collection?.traits
    const stats = data?.collection?.stats
    const stringTraits = {}
    const numericTraits = {}
    const newNumericTraits = []
    const newStringTraits = []
    for (const entity in traits) {
      const isNumericTrait =
        traits[entity].hasOwnProperty('min') &&
        traits[entity].hasOwnProperty('max')

      isNumericTrait
        ? (numericTraits[entity] = {
            key: entity,
            count: 0,
            attributes: []
          })
        : (stringTraits[entity] = {
            key: entity,
            count: 0,
            attributes: []
          })

      for (const value in traits[entity]) {
        const isNumericTrait =
          traits[entity].hasOwnProperty('min') &&
          traits[entity].hasOwnProperty('max')

        if (isNumericTrait) {
          numericTraits[entity].count =
            traits[entity].max - traits[entity].min + 1
          numericTraits[entity].attributes.push({
            count: traits[entity][value],
            value: value
          })
        } else {
          stringTraits[entity].count++
          stringTraits[entity].attributes.push({
            value: value,
            count: traits[entity][value]
          })
        }
      }
    }

    for (const entity in stringTraits) {
      newStringTraits.push(stringTraits[entity])
    }

    for (const entity in numericTraits) {
      newNumericTraits.push(numericTraits[entity])
    }

    const extractedStats = {
      sales_volume: String(stats.total_sales),
      average_price: String(stats.average_price),
      one_day_sales: String(stats.one_day_sales),
      seven_day_sales: String(stats.seven_day_sales)
    }

    saveStats(extractedStats, collectionSlug)

    sequelize.models.collections
      .update(
        {
          string_traits: newStringTraits,
          numeric_traits: newNumericTraits,
          checked_tarits: true
        },
        {
          where: { collection_slug: collectionSlug }
        }
      )
      .then(console.log)
      .catch(console.log)

    return {
      numeric_traits: newNumericTraits,
      string_traits: newStringTraits
    }
  } catch (e) {
    console.log(e)
  }
}

const saveStats = (extractedStats, collectionSlug) => {
  sequelize.models.collections
    .update(extractedStats, {
      where: {
        collection_slug: collectionSlug
      }
    })
    .then(() => null)
    .catch((e) => console.log(e))
}

module.exports = { getTraits, getCollectionsTraits }
