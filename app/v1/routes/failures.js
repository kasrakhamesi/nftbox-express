const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

const { failures } = require('../controllers')

router.get('/unauthurized', failures.unauthurized)

module.exports = router