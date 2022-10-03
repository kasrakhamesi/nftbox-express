const axios = require('axios')
const { sequelize } = require('../../models')
const _ = require('lodash')
const { Op } = require('sequelize')

const getTokensId = async () => {
  try {
    let apiKey = await sequelize.models.configurations.findOne({
      where: {
        key: 'AlchemyApiKey'
      }
    })

    apiKey = _.isEmpty(apiKey)
      ? 'c8XCRD_56zo2QvYijbbPfaw6AgZ9X-e0'
      : apiKey?.value

    const collections = await sequelize.models.collections.findAll({
      where: {
        [Op.or]: [
          { string_traits: { [Op.ne]: null } },
          { numeric_traits: { [Op.ne]: null } },
          { checked_tarits: true }
        ]
      }
    })

    for (const collection of collections) {
      try {
        if (collection.total_supply < collection.owners_count) continue

        const tokens = await sequelize.models.tokens.findAll({
          where: {
            collectionId: collection?.id
          },
          order: [['token_id', 'desc']]
        })

        if (tokens.length === collection.total_supply) continue

        await getAll(
          collection.contract_address,
          collection.id,
          apiKey,
          tokens?.token_id || ''
        )
      } catch (e) {
        console.log(e)
        continue
      }
    }
  } catch (e) {
    console.log(e)
  }
}

const getAll = async (contractAddress, contractId, apiKey, startToken = '') => {
  let hasNextPage = true
  totalNftsFound = 0
  while (hasNextPage) {
    const { nfts, nextToken } = await callGetNFTsForCollectionOnce(
      startToken,
      contractAddress,
      contractId,
      apiKey
    )
    if (!nextToken) {
      hasNextPage = false
    }
    startToken = nextToken
    totalNftsFound += nfts.length
  }
}

const calculateBasicScore = async (string_traits, numeric_traits) => {
  try {
    let score = 0

    for (const trait of string_traits) {
      const calculatedValue = parseFloat((1 / trait?.value_percent) * 100)
      score += parseFloat(calculatedValue)
    }
    for (const trait of numeric_traits) {
      const calculatedValue = parseFloat((1 / trait?.value_percent) * 100)
      score += parseFloat(calculatedValue)
    }

    return score
  } catch (e) {
    console.log(e)
    return null
  }
}

const calculateNormalScore = async (string_traits, numeric_traits) => {
  try {
    let score = 0

    for (const trait of string_traits) {
      const calculatedValue = parseFloat((1 / trait?.value_percent) * 100)
      const valueWithTraitCount = calculatedValue / trait.trait_count
      score += parseFloat(valueWithTraitCount)
    }
    for (const trait of numeric_traits) {
      const calculatedValue = parseFloat((1 / trait?.value_percent) * 100)
      const valueWithTraitCount = calculatedValue / trait.trait_count
      score += parseFloat(valueWithTraitCount)
    }

    return score
  } catch (e) {
    console.log(e)
    return null
  }
}

const callGetNFTsForCollectionOnce = async (
  startToken = '',
  contractAddress,
  collectionId,
  apiKey
) => {
  try {
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTsForCollection`
    const url = `${baseURL}/?contractAddress=${contractAddress}&startToken=${startToken}&withMetadata=true`
    const response = await axios.get(url)
    if (response.status !== 200)
      throw new Error(response?.response.message || 'error')

    const findedCollection = await sequelize.models.collection.findOne({
      where: {
        null: null
      },
      attribute: [['string_traits', 'numeric_traits', 'total_supply']]
    })

    const tokens = response?.data?.nfts
    for (const token of tokens) {
      try {
        const tokenId = parseInt(token?.id?.tokenId, 16)
        const name = token?.metadata?.name
        const description = token?.metadata?.description
        const image = token?.metadata?.image
        const tokenUrl = token?.tokenUri?.raw
        const numericTraits = []
        const stringTraits = []

        const attributes = token?.metadata?.attributes
        for (const attribute of attributes) {
          try {
            if (typeof attribute?.value === 'number') {
              const trait = findedCollection?.numeric_traits.find(
                (item) =>
                  item?.key.toLowerCase() ===
                  attribute?.trait_type.toLowerCase()
              )

              const valuePercent = parseFloat(
                (trait?.count * 100) / findedCollection.total_supply
              )

              numericTraits.push({
                trait_count: trait?.count,
                trait_type: attribute?.trait_type,
                value_percent: valuePercent > 100 ? 100 : valuePercent,
                value: attribute?.value
              })
            } else {
              const trait = findedCollection.string_traits.find(
                (item) =>
                  item.key.toLowerCase() === attribute?.trait_type.toLowerCase()
              )

              const traitValue = trait.attributes.find(
                (item) =>
                  item.value.toLowerCase() === attribute?.value.toLowerCase()
              )

              const valuePercent = parseFloat(
                (traitValue.count * 100) / findedCollection.total_supply
              )

              stringTraits.push({
                trait_count: trait?.count,
                trait_type: attribute?.trait_type,
                value_percent: valuePercent > 100 ? 100 : valuePercent,
                value: attribute?.value
              })
            }
          } catch (e) {
            console.log(e)
            continue
          }
        }

        await sequelize.models.tokens.create({
          collectionId,
          token_id: parseInt(tokenId),
          string_traits: _.isEmpty(stringTraits) ? null : stringTraits,
          basic_score: calculateBasicScore(stringTraits, numericTraits),
          normal_score: calculateNormalScore(stringTraits, numericTraits),
          numeric_traits: _.isEmpty(numericTraits) ? null : numericTraits,
          token_image: image,
          token_description: description,
          token_name: name,
          token_url: tokenUrl
        })

        await calculateBasicAndNormalRank(collectionId)
      } catch (e) {
        console.log(e)
        continue
      }
    }
    return response.data
  } catch (e) {
    console.log(e)
  }
}

const calculateBasicAndNormalRank = async (collectionId) => {
  const tokens = await sequelize.models.tokens.findAll({
    where: {
      collectionId
    }
  })
  let basicRankNumber = 1
  const sortedFromBasicScoreTokens = tokens.sort(
    (a, b) => b.basic_score - a.basic_score
  )
  for (const token of sortedFromBasicScoreTokens) {
    sequelize.models.tokens
      .update(
        {
          basic_rank: basicRankNumber
        },
        {
          where: {
            collectionId,
            token_id: token.token_id
          }
        }
      )
      .then(() => null)
      .catch((e) => console.log(e))
    basicRankNumber++
  }

  const sortedFromNormalScoreTokens = tokens.sort(
    (a, b) => b.normal_score - a.normal_score
  )
  let normalRankNumber = 1
  for (const token of sortedFromNormalScoreTokens) {
    sequelize.models.tokens
      .update(
        {
          normal_rank: normalRankNumber
        },
        {
          where: {
            collectionId,
            token_id: token.token_id
          }
        }
      )
      .then(() => null)
      .catch((e) => console.log(e))
    normalRankNumber++
  }
}

module.exports = { getTokensId }
