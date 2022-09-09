const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const routes = {}
app.use(cors())

const cont = '0x705b9dbd0d5607beafe12e2fb74d64268d3ba35f'

//const r = require('./app/v1/services/reservoir')
//const t = new r.listings.GetListings(cont)
//const y = new r.sales.GetSales(cont)

/*
t.save()
  .then((r) => {
    console.log(r)
    console.log('-----SALES--------')
  })
  .catch(console.log)
  */
//y.save().then(console.log).catch(console.log)
routes.v1 = require('./app/v1/routes')
app.use('/v1', routes.v1)

const tasks = require('./app/v1/tasks')
tasks.trending()
tasks.tokensId()

//tasks.listings()
//tasks.stats()
//tasks.traits()

app.use('*', (req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(process.env.PORT)
