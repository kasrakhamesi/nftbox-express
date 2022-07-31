const axios = require('axios')
const { sequelize } = require('../../models')
const theBaseUrl = 'https://api.reservoir.tools/orders/asks/v2'
let contracts = '0xe5e771bc685c5a89710131919c616c361ff001c6'
let sortBy = 'createdAt'
let limit = '1000'
let listingsObject = {}

const insert = async (obj) => {
  return await sequelize.models.listings.create(obj)
}

const getCollectionId = async () => {
  const collections = await sequelize.models.collections.findOne({
    where: { contract_address: contracts },
    attributes: ['id']
  })
  return collections.dataValues.id
}

const extractTokenId = (token) => {
  return token.split(':')[2]
}

const constructListingObject = (
  collectionId,
  price,
  token_id,
  is_delist,
  image_url,
  opensea_url,
  timestamp
) => {
  return {
    collectionId,
    price,
    token_id: extractTokenId(token_id),
    is_delist,
    image_url,
    opensea_url,
    timestamp
  }
}

async function save() {
  const resAxiosListings = await axios({
    method: 'get',
    url: `${theBaseUrl}?contracts=${contracts}&sortBy=${sortBy}&limit=${limit}`,
    headers: {
      header: 'f042cd77-177d-4c91-bc1e-2fd4b5dd101a'
    }
  }).catch((err) => console.log(err))

  const collectionId = await getCollectionId()

  for (let entity of resAxiosListings.data.orders) {
    insert(
      constructListingObject(
        collectionId,
        entity.price,
        entity.tokenSetId,
        false,
        entity.metadata.data.image,
        entity.source.url,
        entity.createdAt
      )
    )
  }
}

save()
