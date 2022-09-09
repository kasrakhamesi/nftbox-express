const { Router } = require('express')
const router = Router()
const { upcomings } = require('../controllers')

router.get('/upcomings/id/:id', upcomings.findOne)
router.get('/upcomings', upcomings.findAll)

module.exports = router
