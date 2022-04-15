const express = require('express')
const router = express.Router()
const { passport } = require('../middlewares')

router.use(passport.adminsPassport.initialize())
router.use(require('./admins'))
router.use(require('./tables'))
router.use(require('./failures'))
router.use(require('./activitylogs'))

module.exports = router