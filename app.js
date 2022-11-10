const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const routes = {}
app.use(cors())
require('./app/v1/io')
routes.v1 = require('./app/v1/routes')
app.use('/v1', routes.v1)

const tasks = require('./app/v1/tasks')
//tasks.tokensId()
//tasks.traits()
//tasks.listings()
//tasks.run()

const swaggerUi = require('swagger-ui-express')
const swaggerUserDocument = require('./swagger.json')

app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerUserDocument))

app.use('*', (req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(process.env.PORT)
