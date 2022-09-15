const express = require('express')
const router = express.Router()
const { collections } = require('../controllers')

router.get('/tokens', collections.info.tokens)
router.get('/listings', collections.info.listings)
router.get('/sales', collections.info.sales)

module.exports = router
