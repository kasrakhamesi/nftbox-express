const { alchemy } = require('../../services')

module.exports.checkIsSpamContract = async (req, res) => {
  try {
    const { collection } = req.params

    return res
      .status(alchemy.scam.checkScamToken.statusCode)
      .send(alchemy.scam.checkScamToken)
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      data: null,
      error: {
        message: e.message
      }
    })
  }
}
