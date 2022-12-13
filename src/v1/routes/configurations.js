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

router.put(
    '/admins/configurations/id/:id',
    adminsPassport,
    admins.configurations.update
)
router.get(
    '/admins/configurations',
    adminsPassport,
    admins.configurations.findAll
)

module.exports = router
