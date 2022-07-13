const axios = require('axios')
const { sequelize } = require('../../models')
const _ = require('lodash')
const { Op } = require('sequelize')
const { delay } = require('../../utils')

module.exports.getTokensId = async () => {
    try {
        let apiKey = await sequelize.models.configurations.findOne({
            where: {
                key: 'AlchemyApiKey'
            }
        })

        apiKey = _.isEmpty(apiKey)
            ? 'c8XCRD_56zo2QvYijbbPfaw6AgZ9X-e0 '
            : apiKey?.value

        const resAllCollections = await sequelize.models.collections.findAll({
            where: {
                [Op.or]: [
                    { string_traits: { [Op.ne]: null } },
                    { numeric_traits: { [Op.ne]: null } },
                    { checked_tarits: true }
                ]
            }
        })

        for (let k = 0; k < resAllCollections.length; k++) {
            try {
                if (
                    resAllCollections[k].total_supply <
                    resAllCollections[k].owners_count
                )
                    continue

                await getAll(
                    resAllCollections[k].contract_address,
                    resAllCollections[k].id,
                    apiKey
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

const getAll = async (contractAddress, contractId, apiKey) => {
    let startToken = ''
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
            // When nextToken is not present, then there are no more NFTs to fetch.
            hasNextPage = false
        }
        startToken = nextToken
        totalNftsFound += nfts.length
    }
}

const callGetNFTsForCollectionOnce = async (
    startToken = '',
    contractAddress,
    contractId,
    apiKey
) => {
    try {
        const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTsForCollection`

        const url = `${baseURL}/?contractAddress=${contractAddress}&startToken=${startToken}&withMetadata=true`
        const response = await axios.get(url)
        if (response.status !== 200)
            throw new Error(response?.response.message || 'error')

        const nfts = response?.data?.nfts
        for (let k = 0; k < nfts.length; k++) {
            try {
                const tokenId = parseInt(nfts[k]?.id?.tokenId, 16)
                const name = nfts[k]?.metadata?.name
                const description = nfts[k]?.metadata?.description
                const image = nfts[k]?.metadata?.image
                const tokenUrl = nfts[k]?.tokenUri?.raw

                const numericTraits = []
                const stringTraits = []

                const attributes = nfts[k]?.metadata?.attributes
                for (let n = 0; n < attributes.length; n++) {
                    try {
                        if (
                            attributes[n].hasOwnProperty('max_value') &&
                            typeof attributes[n]?.max_value === 'number'
                        )
                            numericTraits.push({
                                trait_type: attributes[n].trait_type,
                                value: attributes[n].value,
                                max_value: attributes[n].max_value
                            })
                        else
                            stringTraits.push({
                                trait_type: attributes[n].trait_type,
                                value: attributes[n].value
                            })
                    } catch (e) {
                        console.log(e)
                        continue
                    }
                }
                await sequelize.models.tokens.create({
                    collectionId: contractId,
                    token_id: parseInt(tokenId),
                    string_traits: _.isEmpty(stringTraits)
                        ? null
                        : stringTraits,
                    numeric_traits: _.isEmpty(numericTraits)
                        ? null
                        : numericTraits,
                    token_image: image,
                    token_description: description,
                    token_name: name,
                    token_url: tokenUrl
                })
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
