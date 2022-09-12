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
tasks.run()

app.use('*', (req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(process.env.PORT)
