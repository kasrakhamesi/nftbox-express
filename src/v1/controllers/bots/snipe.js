const { reservoir } = require('../../services')

module.exports.generateTransactionData = async (req, res) => {
  try {
    const {
      contractAddress,
      tokenId,
      quantity,
      takerAddress,
      feeBps,
      maxFeePerGas,
      maxPriorityFeePerGas
    } = req.body

    const data = await reservoir.buy.buyContract(
      contractAddress,
      tokenId,
      quantity,
      takerAddress,
      feeBps,
      maxFeePerGas,
      maxPriorityFeePerGas
    )

    res.status(data?.statusCode).send(data)
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
