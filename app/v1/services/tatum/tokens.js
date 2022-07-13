const axios = require('axios')
const { sequelize } = require('../../models')
const _ = require('lodash')
const { Op } = require('sequelize')
const { delay } = require('../../utils')

module.exports.getTokensId = async () => {
    try {
        console.log('start')
        let apiKey = await sequelize.models.configurations.findOne({
            where: {
                key: 'TatumApiKey'
            }
        })

        apiKey = _.isEmpty(apiKey)
            ? 'a97b84c3-a37b-4c3f-85b7-d8b4f69efaa3'
            : apiKey?.value

        console.log(apiKey)

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

                let totalNumberOfRequest =
                    parseInt(parseInt(resAllCollections[k].total_supply) / 50) +
                    1
                let numberOfRequest = 0

                while (totalNumberOfRequest >= numberOfRequest) {
                    await delay.wait(500)

                    const query = new URLSearchParams({
                        pageSize: '50',
                        offset: numberOfRequest.toString()
                    }).toString()

                    const resGetTokenIds = await axios({
                        method: 'get',
                        url: `https://api-us-west1.tatum.io/v3/nft/collection/ETH/${resAllCollections[k].contract_address}?${query}`,
                        headers: {
                            'x-api-key': apiKey
                        }
                    })

                    if (resGetTokenIds?.status !== 200) continue

                    const tokens = resGetTokenIds?.data
                    for (let i = 0; i < tokens.length; i++) {
                        try {
                            const checkToken =
                                await sequelize.models.tokens.findOne({
                                    where: {
                                        collectionId: resAllCollections[k].id,
                                        token_id: parseInt(tokens[i].tokenId)
                                    }
                                })
                            if (!_.isEmpty(checkToken)) continue

                            const numericTraits = []
                            const stringTraits = []

                            console.log(tokens[i])

                            const traits =
                                tokens[i]?.metadata?.metadata?.attributes

                            console.log(resAllCollections[k].contract_address)
                            console.log(traits)

                            for (let j = 0; j < traits.length; j++) {
                                try {
                                    if (
                                        traits[j].hasOwnProperty('max_value') &&
                                        typeof traits[j]?.max_value === 'number'
                                    )
                                        numericTraits.push({
                                            trait_type: traits[j].trait_type,
                                            value: traits[j].value,
                                            max_value: traits[j].max_value
                                        })
                                    else
                                        stringTraits.push({
                                            trait_type: traits[j].trait_type,
                                            value: traits[j].value
                                        })
                                } catch (e) {
                                    console.log(e)
                                    continue
                                }
                            }

                            await sequelize.models.tokens.create({
                                collectionId: resAllCollections[k].id,
                                token_id: parseInt(tokens[i]?.tokenId),
                                string_traits: _.isEmpty(stringTraits)
                                    ? null
                                    : stringTraits,
                                numeric_traits: _.isEmpty(numericTraits)
                                    ? null
                                    : numericTraits,
                                token_image: null, //tokens[i]?.metadata?.metadata?.image,
                                token_description: null, //tokens[i]?.metadata?.metadata?.description,
                                token_name: null, // tokens[i]?.metadata?.metadata?.name,
                                token_url: null // tokens[i]?.metadata?.url
                            })
                        } catch (e) {
                            console.log(e)
                        }
                    }
                    numberOfRequest += 50
                }
            } catch (e) {
                console.log(e)
                continue
            }
        }
    } catch (e) {
        console.log(e)
    }
}
