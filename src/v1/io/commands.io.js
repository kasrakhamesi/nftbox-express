const { Server } = require('socket.io')
const io = new Server(process.env.SOCKET_PORT, {
  cors: {
    origin: '*'
  }
})
const { sequelize } = require('../models')
const _ = require('lodash')

const collectionCondition = (collection) => {
  const condition =
    collection.substring(0, 2) !== '0x'
      ? { collection_slug: collection }
      : { contract_address: collection }

  return condition
}

const getListings = async (collection, allowBuy = false) => {
  try {
    const condition = collectionCondition(collection)
    const findedCollection = await sequelize.models.collections.findOne({
      where: condition
    })
    if (_.isEmpty(findedCollection)) throw new Error("Can't find Collection")

    //TODO DELETE RELATION

    const listings = await sequelize.models.listings.findAll({
      where: {
        collectionId: findedCollection?.id,
        allow_buy: allowBuy
      },
      attributes: {
        exclude: [
          'id',
          'tokenId',
          'collectionId',
          'allow_buy',
          'createdAt',
          'updatedAt'
        ],
        limit: 10
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
            'string_traits',
            'numeric_traits',
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
        meta: { ...token.dataValues, property: 'common' }
      })
    }

    return {
      statusCode: 200,
      data: newData,
      error: null
    }
  } catch (e) {
    return {
      statusCode: 400,
      data: null,
      error: e.message
    }
  }
}

const getSales = async (collection) => {
  try {
    const condition = collectionCondition(collection)
    const findedCollection = await sequelize.models.collections.findOne({
      where: condition
    })
    if (_.isEmpty(findedCollection)) throw new Error("Can't find Collection")

    const sales = await sequelize.models.sales.findAll({
      where: {
        collectionId: findedCollection?.id
      },
      attributes: {
        exclude: ['id', 'tokenId', 'collectionId', 'createdAt', 'updatedAt']
      },
      limit: 10
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
            'string_traits',
            'numeric_traits',
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
        meta: { ...token.dataValues, property: 'common' }
      })
    }

    return {
      statusCode: 200,
      data: newData,
      error: null
    }
  } catch (e) {
    return {
      statusCode: 400,
      data: null,
      error: e.message
    }
  }
}

const getRelists = async (collection) => {
  try {
    const condition = collectionCondition(collection)
    const findedCollection = await sequelize.models.collections.findOne({
      where: condition
    })
    if (_.isEmpty(findedCollection)) throw new Error("Can't find Collection")

    const relists = await sequelize.models.relists.findAll({
      where: {
        collectionId: findedCollection?.id
      },
      attributes: {
        exclude: [
          'id',
          'tokenId',
          'collectionId',
          'image_url',
          'url',
          'market',
          'createdAt',
          'updatedAt'
        ]
      }
    })
    return {
      statusCode: 200,
      data: relists,
      error: null
    }
  } catch (e) {
    return {
      statusCode: 400,
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
    let responseData = {
      statusCode: 404,
      data: [],
      error: null
    }
    if (event === 'listings') responseData = await getListings(collection)
    else if (event === 'sales') responseData = await getSales(collection)
    else if (event === 'relists') responseData = await getRelists(collection)
    socket.emit('events', responseData)
  })
})
