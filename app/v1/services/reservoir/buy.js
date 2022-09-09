const axios = require('axios')

module.exports.buyContract = async (
  contractAddress,
  tokenId,
  quantity,
  takerAddress,
  feeBps,
  maxFeePerGas,
  maxPriorityFeePerGas,
) => {
  try {
    contractAddress = '0xea97fc2c61b8faf98f20ba81aa8a2cf117eb04dc'
    tokenId = '2994'
    quantity = '1'
    takerAddress = 's'
    feeBps = '100'
    maxFeePerGas = '10'
    maxPriorityFeePerGas = '5'

    const url = `https://api.reservoir.tools/execute/buy/v2?token=${contractAddress}%3A${tokenId}&quantity=${quantity}&taker=${takerAddress}&onlyQuote=false&referrerFeeBps=${feeBps}&partial=false&maxFeePerGas=${maxFeePerGas}&maxPriorityFeePerGas=${maxPriorityFeePerGas}&skipBalanceCheck=false`
    const res = await axios({
      method: 'get',
      url: url,
      header: {
        'x-api-key': 'asdasd'
      }
    })

    if (res.status !== 200)
      throw new Error(res?.data?.message || "Can't submit request")

    return {
      statusCode: 200,
      data: { data: steps[0]?.data },
      error: null
    }
  } catch (e) {
    return {
      statusCode: 400,
      data: null,
      error: {
        message: e.message
      }
    }
  }
}
