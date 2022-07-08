const axios = require('axios')
const { sequelize } = require('../../models')
const { Op } = require('sequelize')
const _ = require('lodash')
require('dotenv').config()

module.exports.getTraits = async () => {
    let apiKey = await sequelize.models.configurations.findOne({
        where: {
            key: 'ModuleNftApiKey'
        }
    })

    apiKey = _.isEmpty(apiKey) ? null : apiKey?.value

    const resAllCollections = await sequelize.models.collections.findAll({
        where: {
            [Op.and]: [
                { string_traits: null },
                { numeric_traits: null },
                { checked_tarits: false }
            ]
        }
    })

    for (let k = 0; k < resAllCollections.length; k++) {
        try {
            const resAxios = await axios({
                method: 'get',
                url: `${process.env.MODULE_NFT_BASEURL}/opensea/collection/traits?type=${resAllCollections[k].contract_address}`,
                headers: {
                    'X-API-KEY': apiKey
                }
            })

            if (resAxios.status !== 200) continue

            if (resAxios.data.error !== null) continue

            if (resAxios.data.info?.numericTraits.length === 0) {
                await sequelize.models.collections.update(
                    {
                        string_traits: resAxios.data.info.stringTraits,
                        checked_tarits: true
                    },
                    {
                        where: {
                            contract_address:
                                resAllCollections[k].contract_address
                        }
                    }
                )
            } else {
                await sequelize.models.collections.update(
                    {
                        string_traits: resAxios.data.info.stringTraits,
                        numeric_traits: resAxios.data.info.numeric_traits,
                        checked_tarits: true
                    },
                    {
                        where: {
                            contract_address:
                                resAllCollections[k].contract_address
                        }
                    }
                )
            }
        } catch {
            continue
        }
    }
}

/*

module.exports.getTraitsAndInfoFromContractAddress = async (
    contract_address
) => {
    try {
        if (!String(contract_address).includes('0x'))
            throw new Error('invalid contract address')

        const resFindContract = await Model.models.collections_traits.findOne({
            where: {
                contract_address: contract_address
            }
        })

        if (!_.isEmpty(resFindContract)) {
            return {
                status: 200,
                content: {
                    total_supply: resFindContract?.total_supply,
                    collection_name: resFindContract?.contract_name,
                    tratis: JSON.parse(resFindContract?.traits)
                }
            }
        }

        const res = await axios.get(
            `${process.env.MODULE_NFT_BASEURL}/opensea/collection/traits?type=${contract_address}`
        )

        if (res?.data?.error !== null) throw new Error(res?.data?.error)

        const resCollectionInfo = await axios.get(
            `${process.env.MODULE_NFT_BASEURL}/opensea/collection/info?type=${contract_address}`
        )

        if (resCollectionInfo?.data?.error !== null)
            throw new Error(resCollectionInfo?.data?.error)

        const data = {
            total_supply: parseInt(
                resCollectionInfo?.data?.info?.statistics?.totalSupply
            ),
            contract_address: contract_address,
            collection_name: res?.data?.collection,
            traits: res?.data?.info?.stringTraits
        }

        Model.models.collections_traits
            .create(data)
            .then(console.log)
            .catch(console.log)

        return {
            status: 200,
            content: {
                total_supply: parseInt(
                    resCollectionInfo?.data?.info?.statistics?.totalSupply
                ),
                collection_name: res?.data?.collection,
                tratis: res?.data?.info?.stringTraits
            }
        }
    } catch (e) {
        return {
            status: 400,
            content: { message: e.message }
        }
    }
}

module.exports.getFloorPrice = async () => {
    try {
        const listingItems = await Model.models.upcomings.findAll({
            where: {
                [Op.not]: {
                    contract_address: null,
                    contract_address: ''
                }
            }
        })

        if (listingItems.length <= 0) return

        let url = `${process.env.MODULE_NFT_BASEURL}/opensea/collection/batchInfo?`

        let payload = null

        for (let k = 0; k < listingItems.length; k++) {
            try {
                const contractAddress = listingItems[k].contract_address
                payload += `type=${contractAddress}&`
            } catch {
                continue
            }
        }

        payload = payload.substr(4, payload.length).slice(0, -1)

        const res = await axios.get(url + payload)

        if (res.status !== 200) return

        const data = res.data

        let updateStructure = []

        for (let i = 0; i < data.length; i++) {
            try {
                if (data[i]?.error !== null) continue

                updateStructure.push({
                    floor: data[i]?.info?.statistics?.floorPrice?.unit,
                    contract_address: data[i]?.info?.contractAddress
                })
            } catch (e) {
                console.log(e)
            }
        }

        const result = await Promise.all(updateStructure)

        const promises = result.map((item) => {
            const { floor, contract_address } = item
            return Model.models.upcomings.update(
                { floor: floor },
                {
                    where: {
                        contract_address: contract_address
                    }
                }
            )
        })

        await Promise.all(promises)
    } catch (e) {
        console.log(e)
    }
}

module.exports.getBatchCollectionInfo = async () => {
    try {
        const listingItems = await Model.models.upcomings.findAll({
            where: {
                [Op.not]: {
                    contract_address: null,
                    contract_address: ''
                }
            }
        })

        if (listingItems.length <= 0) return

        let url = `${process.env.MODULE_NFT_BASEURL}/opensea/collection/batchInfo?`

        let payload = null

        for (let k = 0; k < listingItems.length; k++) {
            try {
                const contractAddress = listingItems[k].contract_address
                payload += `type=${contractAddress}&`
            } catch {
                continue
            }
        }

        payload = payload.substr(4, payload.length).slice(0, -1)

        const res = await axios.get(url + payload)

        if (res.status !== 200) return

        const data = res.data

        let updateStructure = []

        for (let i = 0; i < data.length; i++) {
            try {
                if (data[i]?.error !== null) continue

                updateStructure.push({
                    floor: data[i]?.info?.statistics?.floorPrice?.unit,
                    contract_address: data[i]?.info?.contractAddress
                })
            } catch (e) {
                console.log(e)
            }
        }

        const result = await Promise.all(updateStructure)
    } catch (e) {
        console.log(e)
    }
}
*/
