const { Server } = require('socket.io')
const io = new Server(process.env.SOCKET_PORT, {
  cors: {
    origin: '*'
  }
})
const { sequelize } = require('../models')
const _ = require('lodash')

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
      },
      include: {
        model: sequelize.models.tokens,
        as: 'meta',
        attributes: { exclude: ['id'] }
      },
      attributes: {
        exclude: ['id', 'tokenId', 'collectionId']
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

  socket.on('events', async (args) => {
    const collection = args?.collection
    const event = args?.event
    let responseData = null
    if (event === 'listings') responseData = await getListings(collection)
    else if (event === 'sales') responseData = await getSales(collection)
    socket.emit('events', responseData)
  })
})
