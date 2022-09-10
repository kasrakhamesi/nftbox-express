const { Router } = require('express')
const router = Router()
const { upcomings } = require('../controllers')

router.get('/id/:id', upcomings.findOne)
router.get('/', upcomings.findAll)

module.exports = router
