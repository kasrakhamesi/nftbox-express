const express = require('express')
const router = express.Router()
const { tables } = require('../controllers')
const { passport } = require('../middlewares')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

const adminsPassport = passport.adminsPassport.authenticate('jwt', {
    session: false,
    failureRedirect: '/v1/unauthurized'
})

router.put(
    '/admins/tables/categories/id/:id',
    adminsPassport,
    tables.categories.update
)
router.get(
    '/admins/tables/categories/id/:id',
    adminsPassport,
    tables.categories.findOne
)
router.get(
    '/admins/tables/categories',
    adminsPassport,
    tables.categories.findAll
)
router.delete(
    '/admins/tables/categories/id/:id',
    adminsPassport,
    tables.categories.delete
)
router.post(
    '/admins/tables/categories',
    adminsPassport,
    tables.categories.create
)

router.get('/tables/categories/id/:id', tables.categories.Users.findOne)
router.get('/tables/categories', tables.categories.Users.findAll)

module.exports = router
