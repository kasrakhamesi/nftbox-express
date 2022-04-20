const express = require('express')
const router = express.Router()
const { tables } = require('../controllers')
const { passport } = require('../middlewares')
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())


const adminsPassport = passport.adminsPassport.authenticate('jwt', { session: false ,failureRedirect : "/v1/unauthurized" })

//Admins Managments Routes
router.put('/admins/tables/upcoming/id/:id', adminsPassport, tables.upcoming.update)
router.get('/admins/tables/upcoming/id/:id', adminsPassport, tables.upcoming.findOne)
router.get('/admins/tables/upcoming', adminsPassport, tables.upcoming.findAll)
router.delete('/admins/tables/upcoming/id/:id', adminsPassport, tables.upcoming.delete)
router.post('/admins/tables/upcoming', adminsPassport, tables.upcoming.create)

router.get('/tables/upcoming/id/:id',tables.upcoming.Users.findOne)
router.get('/tables/upcoming',tables.upcoming.Users.findAll)



//router.get('/tables/upcoming' , tables.upcomingCategories.Users.findAll)

router.get('/tables/upcoming/filters/categories', (req,res) => {
    let categories = ['salam','khobi','are']
    res.status(200).send({categories : categories})
})

module.exports = router