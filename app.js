const express = require('express')
require('dotenv').config()
const app = express()
const routes = {}
routes.v1 = require('./app/v1/routes')

app.use('/v1', routes.v1)

app.use('*', (req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(process.env.PORT)