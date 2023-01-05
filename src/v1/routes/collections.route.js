const express = require('express')
const router = express.Router()
const { collections } = require('../controllers')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.post('/:collection/live', collections.live.create)
router.get('/:collection/listings/live', collections.live.findAll)
router.get('/:collection', collections.info.findOne)
router.get('/:collection/floor', collections.info.floorPrices)
router.get('/:collection/relists', collections.info.getRelists)
router.get('/:collection/listings', collections.listings.findAll)
router.get('/:collection/sales', collections.sales.findAll)
router.get('/:collection/token/:tokenId', collections.tokens.findOne)
router.get('/:collection/search', collections.info.search)

module.exports = router
