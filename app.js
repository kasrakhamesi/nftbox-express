const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const routes = {}
routes.v1 = require('./app/v1/routes')
app.use(cors())

app.use('/v1', routes.v1)
const tasks = require('./app/v1/tasks')
// tasks.listings()
// tasks.stats()
// tasks.trending()
// tasks.traits()
// tasks.tokensId()

const qR = require('./app/v1/services/alchemy')
//qR.tokens.getTokensId().then(console.log).catch(console.log)

const yyy = async () => {
  await areDgAziz.trending.SaveTopCollections.init()

  const q = new areDgAziz.listings.GetListings(
    '0x1792a96e5668ad7c167ab804a100ce42395ce54d'
  )
  const q2 = await q.save()

  const o = new areDgAziz.orders.GetOrders(
    '0x1792a96e5668ad7c167ab804a100ce42395ce54d'
  )
  const o2 = await o.save()
}

//yyy().then(console.log).catch(console.log)

app.use('*', async (req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(process.env.PORT)
