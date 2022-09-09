const { config } = require('../io')
const { sequelize } = require('../models')
const _ = require('lodash')
const io = config

const conditionCreator = (collection) => {
  const condition =
    collection.substring(0, 2) !== '0x'
      ? { collection_slug: collection }
      : { contract_address: collection }

  return condition
}

const getListings = async (collection, allowBuy = true) => {
  try {
    const condition = conditionCreator(collection)
    const findedCollection = await sequelize.models.collections.findOne({
      where: condition
    })
    if (_.isEmpty(findedCollection)) throw new Error("Can't find Collection")

    const listings = await sequelize.models.listings.findAll({
      where: {
        collectionId: findedCollection?.id,
        allow_buy: allowBuy
      }
    })
    return {
      statusCode: 200,
      data: listings,
      error: null
    }
  } catch (e) {
    return {
      statusCode: 404,
      data: null,
      error: e.message
    }
  }
}

const getSales = async (collection) => {
  try {
    const condition = conditionCreator(collection)
    const findedCollection = await sequelize.models.collections.findOne({
      where: condition
    })
    if (_.isEmpty(findedCollection)) throw new Error("Can't find Collection")

    const sales = await sequelize.models.sales.findAll({
      where: {
        collectionId: findedCollection?.id
      }
    })
    return {
      statusCode: 200,
      data: sales,
      error: null
    }
  } catch (e) {
    return {
      statusCode: 404,
      data: null,
      error: e.message
    }
  }
}

io.on('connection', (socket) => {
  io.emit('ping', 'pong')

  socket.on('listings', async (args) => {
    const collection = args?.collection
    const listings = await getListings(collection)
    socket.emit('listings', listings)
  })
  socket.on('sales', async (args) => {
    const collection = args?.collection
    const sales = await getSales(collection)
    socket.emit('sales', sales)
  })
})
