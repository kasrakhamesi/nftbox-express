const express = require('express')
const router = express.Router()
const { tokens } = require('../controllers')

router.get('/collections/:collection/token/:tokenId', tokens.info.getTokens)

module.exports = router
