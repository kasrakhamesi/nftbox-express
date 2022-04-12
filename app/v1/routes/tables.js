const express = require('express')
const router = express.Router()
const { tables } = require('../controllers')
const { passport } = require('../middlewares')
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())


const adminsPassport = passport.adminsPassport.authenticate('jwt', { session: false ,failureRedirect : "/v1/unauthurized" })

//Admins Managments Routes
router.all('/admins/tables/listings/id/:id', adminsPassport, tables.listings.handler)
router.all('/admins/tables/listings', adminsPassport, tables.listings.handler)
router.get('/tables/listings/id/:id',tables.listings.userGetTable)
router.get('/tables/listings',tables.listings.userGetTable)

module.exports = router