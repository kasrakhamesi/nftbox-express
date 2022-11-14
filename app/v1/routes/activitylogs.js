const express = require('express')
const router = express.Router()
const { admins } = require('../controllers')
const { passport } = require('../middlewares')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

const adminsPassport = passport.adminsPassport.authenticate('jwt', {
  session: false,
  failureRedirect: '/v1/unauthurized'
})

//Admin Login && Register && Dashboard Routes
router.get(
  '/admins/activitylogs/id/:id',
  adminsPassport,
  admins.activityLogs.delete
)
router.get('/admins/activitylogs', adminsPassport, admins.activityLogs.findAll)
router.delete(
  '/admins/activitylogs',
  adminsPassport,
  admins.activityLogs.deleteAll
)

module.exports = router
