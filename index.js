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
tasks.run()

const swaggerUi = require('swagger-ui-express')
const swaggerUserDocument = require('./swagger.json')

app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerUserDocument))

app.use('*', (req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(process.env.PORT)
