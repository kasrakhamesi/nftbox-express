const axios = require('axios')
const { sequelize } = require('../../models')
const theBaseUrl = 'https://api.reservoir.tools/orders/asks/v2'
let contracts = '0xe5e771bc685c5a89710131919c616c361ff001c6'
let sortBy = 'createdAt'
let limit = '1000'
let listingsObject = []

const insert = async (values) => {
  return await sequelize.models.listings.create(values)
}

async function save() {
  const resAxiosListings = await axios({
    method: 'get',
    url: `${theBaseUrl}?contracts=${contracts}&sortBy=${sortBy}&limit=${limit}`,
    headers: {
      header: 'f042cd77-177d-4c91-bc1e-2fd4b5dd101a'
    }
  }).catch((err) => console.log(err))
  for (let entity of resAxiosListings.data.orders) {
  }
}

save()
insert({
  collectionId: 'ssd',
  price: 'null',
  token_id: 'null',
  image_url: 'null',
  is_delist: false,
  opensea_url: 'ss',
  timestamp: 'ssdaf'
})
