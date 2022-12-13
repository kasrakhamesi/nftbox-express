const express = require('express')
const router = express.Router()
const { collections } = require('../controllers')

router.get('/collections', collections.info.c)
router.get('/tokens', collections.info.tokens)
router.get('/listings', collections.info.listings)
router.get('/sales', collections.info.sales)
router.get('/relists', collections.info.relists)

module.exports = router
