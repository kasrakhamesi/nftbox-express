const express = require('express')
const router = express.Router()
const { bots } = require('../controllers')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.get(
  '/bots/auto-mint/scam/collection/:collection',
  bots.autoMint.checkIsSpamContract
)

router.post('/bots/snipe/generate-data', bots.snipe.generateTransactionData)

module.exports = router
