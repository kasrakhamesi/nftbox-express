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
router.use('/collections', require('./collections.route'))
router.use(require('./bots'))
router.use('/upcomings', require('./upcomings.route'))
router.use('/trendings', require('./trendings.route'))
router.use('/ethereum', require('./ethereum.route'))
router.use('/test', require('./test'))

module.exports = router
