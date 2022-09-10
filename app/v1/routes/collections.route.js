const express = require('express')
const router = express.Router()
const { collections } = require('../controllers')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.post('/live', collections.live.create)
router.get('/traits/id/:id', collections.traits.Users.findOne)
router.get('/traits', collections.traits.Users.findAll)
router.get('/:collection', collections.info.findOne)
router.get('/:collection/orders', collections.orders.findAll)
router.get('/:collection/listings', collections.listings.findAll)
router.get('/:collection/token/:tokenId', collections.tokens.findOne)
router.get('/:collection/search', collections.info.search)

module.exports = router
