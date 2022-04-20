const express = require('express')
const router = express.Router()
const { admins } = require('../controllers')
const { passport } = require('../middlewares')
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())


const adminsPassport = passport.adminsPassport.authenticate('jwt', { session: false ,failureRedirect : "/v1/unauthurized" })

router.put('/admins/whitelist-addresses/id/:id', adminsPassport, admins.whitelistAddresses.update)
router.get('/admins/whitelist-addresses/id/:id', adminsPassport, admins.whitelistAddresses.findOne)
router.get('/admins/whitelist-addresses', adminsPassport, admins.whitelistAddresses.findAll)
router.delete('/admins/whitelist-addresses/id/:id', adminsPassport, admins.whitelistAddresses.delete)
router.post('/admins/whitelist-addresses', adminsPassport, admins.whitelistAddresses.create)

module.exports = router