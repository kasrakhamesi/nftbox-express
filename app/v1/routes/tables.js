const express = require('express')
const router = express.Router()
const { tables } = require('../controllers')
const { passport } = require('../middlewares')
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())


const adminsPassport = passport.adminsPassport.authenticate('jwt', { session: false ,failureRedirect : "/v1/unauthurized" })

//Admins Managments Routes
router.put('/admins/tables/listings/id/:id', adminsPassport, tables.listings.update)
router.get('/admins/tables/listings/id/:id', adminsPassport, tables.listings.findOne)
router.get('/admins/tables/listings', adminsPassport, tables.listings.findAll)
router.delete('/admins/tables/listings/id/:id', adminsPassport, tables.listings.delete)
router.post('/admins/tables/listings', adminsPassport, tables.listings.create)

router.get('/tables/listings/id/:id',tables.listings.Users.findOne)
router.get('/tables/listings',tables.listings.Users.findAll)

module.exports = router