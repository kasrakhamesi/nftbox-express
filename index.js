const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const routes = {}
app.use(cors())
require('./src/v1/io')
routes.v1 = require('./src/v1/routes')
app.use('/v1', routes.v1)

const tasks = require('./src/v1/tasks')
tasks.trendings()
//tasks.run()

const getTimestampFromIsoTime = (isoTime) => {
  let timestamp = String(new Date(isoTime).getTime())
  if (timestamp.length === 10) timestamp = parseInt(timestamp) * 1000
  return timestamp
}

console.log(getTimestampFromIsoTime('2018-04-08T22:19:46.000000+00:00'))

const swaggerUi = require('swagger-ui-express')
const swaggerUserDocument = require('./swagger.json')

app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerUserDocument))

app.use('*', (req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(process.env.PORT)
