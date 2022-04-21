const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const routes = {}

app.use(cors())

routes.v1 = require('./app/v1/routes')

/*
const { Client }  = require('twitter.js')

const client = new Client()
*/


app.use('/v1', routes.v1)

app.use('*', (req, res) => {
    /*
  const y = tt("2")
  return res.status(y.status).send(y.content)
await client.loginWithBearerToken(`AAAAAAAAAAAAAAAAAAAAAERkbgEAAAAAwteJU20DinzI5WVRm0ADPuKHFKs%3Df4goyDof9CcXcuptq0xPJgonEFCtqO8epw4FYVANOCEb8CArWW`)
const q= await client.users.fetchByUsername('oddstronauts')
res.send(q)
*/
    res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(process.env.PORT)