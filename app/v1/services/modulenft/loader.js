const { sequelize } = require('../../models')
const pendingCollections = require('../collections/pendings')
const _ = require('lodash')
const axios = require('axios')
require('dotenv').config()

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

module.exports.CollectionInfo = class {
    constructor(collection) {
        this.collection = collection
    }

    saveCollection = async () => {
        return await this.#getCollectionInfo()
    }

    #getCollectionInfo = async () => {
        try {
            const resFindCollection =
                await sequelize.models.collections.findOne({
                    where: {
                        contract_address: this.collection
                    }
                })

            if (!_.isEmpty(resFindCollection))
                throw new Error('We have this collection in our database')

            let apiKey = await sequelize.models.configurations.findOne({
                where: {
                    key: 'ModuleNftApiKey'
                }
            })

            apiKey = _.isEmpty(apiKey) ? null : apiKey?.value

            const resAxios = await axios({
                method: 'get',
                url: `${process.env.MODULE_NFT_BASEURL}/opensea/collection/info?type=${this.collection}`,
                headers: {
                    'X-API-KEY': apiKey
                }
            })

            if (resAxios.status !== 200)
                throw new Error("Request Can't Loaded , please try again")

            if (resAxios.data.error !== null)
                throw new Error(String(resAxios.data.error))

            const resTraits = await this.#getCollectionTraits()

            if (resTraits.status !== 200) return resTraits

            const collectionData = {
                collection_slug: resAxios.data.info.slug,
                collection_name: resAxios.data.info.name,
                contract_address: resAxios.data.info.contractAddress,
                banner_image_url: resAxios.data.info.bannerImageUrl,
                description: resAxios.data.info.description,
                image_url: resAxios.data.info.imageUrl,
                twitter_url: `https://twitter.com/${resAxios.data.info.twitterUsername}`,
                discord_url: resAxios.data.info.discordUrl,
                website_url: resAxios.data.info.externalUrl,
                verified: resAxios.data.info.isVerified,
                telegram_url: resAxios.data.info.telegramUrl,
                instagram_url: `https://instagram.com/${resAxios.data.info.instagramUsername}`,
                traits: resTraits?.content?.traits,
                total_supply: resAxios.data.info.statistics.totalSupply,
                total_volume: resAxios.data.info.statistics.totalVolume.unit,
                floor_price: resAxios.data.info.statistics.floorPrice.unit,
                owners_count: resAxios.data.info.statistics.numOwners,
                is_trending: false
            }

            await pendingCollections.savePending(
                collectionData.contract_address
            )

            await sequelize.models.collections.create(collectionData)

            return {
                status: 200,
                content: {
                    saved: true,
                    collectionData: collectionData
                }
            }
        } catch (e) {
            return {
                status: 400,
                content: {
                    message: e.message
                }
            }
        }
    }
    #getCollectionTraits = async () => {
        try {
            let apiKey = sequelize.models.configurations.findOne({
                where: {
                    key: 'ModuleNftApiKey'
                }
            })

            apiKey = _.isEmpty(apiKey) ? null : apiKey?.value

            const resAxios = await axios({
                method: 'get',
                url: `${process.env.MODULE_NFT_BASEURL}/opensea/collection/traits?type=${this.collection}`,
                headers: {
                    'X-API-KEY': apiKey
                }
            })

            if (resAxios.status !== 200)
                throw new Error("Request Can't Loaded , please try again")

            if (resAxios.data.error !== null)
                throw new Error(String(resAxios.data.error))
            return {
                status: 200,
                content: {
                    traits: resAxios?.data?.info?.stringTraits
                }
            }
        } catch (e) {
            return {
                status: 400,
                content: {
                    message: e.message
                }
            }
        }
    }
}

module.exports.BatchCollectionInfo = class {
    constructor(collections) {
        this.collections = collections
    }

    init = async () => {
        return await this.#getBatchCollectionInfo()
    }

    #getBatchCollectionInfo = async () => {
        try {
            let apiKey = await sequelize.models.configurations.findOne({
                where: {
                    key: 'ModuleNftApiKey'
                }
            })

            apiKey = _.isEmpty(apiKey) ? null : apiKey?.value

            if (this.collections.length <= 0) return

            let url = `${process.env.MODULE_NFT_BASEURL}/opensea/collection/batchInfo?`

            let payload = null

            let numberOfContracts = 0

            let resBatchCollectionInfo = []
            let requestNumber = 0

            for (let i = 0; i < this.collections.length; i++) {
                try {
                    const contracts = `${this.collections[i].collection_slug}&`
                    payload += `type=${contracts}`

                    numberOfContracts++

                    while (numberOfContracts > 25) {
                        if (requestNumber > 2) {
                            await delay(2500)
                            requestNumber = 0
                        }
                        requestNumber++
                        numberOfContracts = 0
                        if (payload !== null)
                            payload = payload
                                .substr(4, payload.length)
                                .slice(0, -1)
                        const resAxios = axios({
                            method: 'get',
                            url: url + payload,
                            headers: {
                                'X-API-KEY': apiKey
                            }
                        })
                        resBatchCollectionInfo.push(resAxios)
                        payload = null
                    }
                } catch (e) {
                    continue
                }
            }

            const collectionsPromises = await Promise.all(
                resBatchCollectionInfo
            )

            let collectionsData = []
            for (let k = 0; k < collectionsPromises.length; k++) {
                try {
                    if (collectionsPromises[k].status !== 200) continue

                    collectionsPromises[k].data
                        .filter(
                            (item) =>
                                item.info.contractAddress !== null &&
                                item.error === null
                        )
                        .map((item) => {
                            collectionsData.push({
                                collection_slug: item.info.slug,
                                contract_address: item.info.contractAddress,
                                banner_image_url: item.info.bannerImageUrl,
                                description: item.info.description,
                                image_url: item.info.imageUrl,
                                twitter_url: `https://twitter.com/${item.info.twitterUsername}`,
                                discord_url: item.info.discordUrl,
                                website_url: item.info.externalUrl,
                                telegram_url: item.info.telegramUrl,
                                instagram_url: `https://instagram.com/${item.info.instagramUsername}`
                            })
                        })
                } catch {
                    continue
                }
            }

            collectionsData = await Promise.all(collectionsData)

            return {
                status: 200,
                content: {
                    data: collectionsData
                }
            }
        } catch (e) {
            return {
                status: 400,
                content: { message: e.message }
            }
        }
    }
}
