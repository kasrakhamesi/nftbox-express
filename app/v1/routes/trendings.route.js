const { Router } = require('express')
const router = Router()
const { trendings } = require('../controllers')

router.get('/ticker/:ticker', trendings.findAll)
router.get('/', trendings.findAll)

module.exports = router
