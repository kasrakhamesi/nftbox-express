const express = require('express')
const router = express.Router()

const { ethereum } = require('../controllers')

router.get('/gas', ethereum.gas.getGas)

module.exports = router
