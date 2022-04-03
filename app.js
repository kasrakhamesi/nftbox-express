const express = require('express')
const dotenv = require('dotenv').config()
const app = express()


app.use('*', (req,res) => {
    res.send('salam')
})

app.listen(process.env.PORT)