const express = require('express')
const router = express.Router()
const { passport } = require('../middlewares')

router.use(passport.adminsPassport.initialize())
router.use(require('./admins'))
router.use(require('./tables'))
router.use(require('./failures'))
router.use(require('./activitylogs'))
router.use(require('./categories'))
router.use(require('./whitelistAddresses'))
router.use(require('./configurations'))
router.use(require('./collections'))
router.use(require('./tokens'))

module.exports = router
