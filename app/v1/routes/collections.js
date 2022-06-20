const express = require('express')
const router = express.Router()
const { collections } = require('../controllers')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.get('/collections/traits/id/:id', collections.traits.Users.findOne)
router.get('/collections/traits', collections.traits.Users.findAll)
router.get('/collections/:collection', collections.info.getInfo)

router.get('/collections/:collection/orders', collections.orders.findAll)
router.get('/collections/:collection/listings', collections.orders.findAll)

module.exports = router
