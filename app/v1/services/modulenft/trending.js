const { sequelize } = require('../../models')
const axios = require('axios')
const _ = require('lodash')
require('dotenv').config()
const loader = require('./loader')

const Upsert = (values, condition) => {
    return sequelize.models.collections
        .findOne({ where: condition })
        .then(async (obj) => {
            if (obj) return await obj.update(values)
            return await sequelize.models.collections.create(values)
        })
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

module.exports.SaveTopCollections = class {
    static init = async () => {
        try {
            return await this.#getTopCollections()
        } catch {}
    }
    static #getTopCollections = async (numberOfTrending = 500) => {
        try {
            numberOfTrending = parseInt(numberOfTrending - 100)

            let offset = 0
            let totalOffset = 0
            let count = 100

            let apiKey = await sequelize.models.configurations.findOne({
                where: {
                    key: 'ModuleNftApiKey'
                }
            })

            apiKey = _.isEmpty(apiKey) ? null : apiKey?.value

            if (numberOfTrending <= 100) count = numberOfTrending
            else {
                totalOffset = numberOfTrending
            }
            let requestNumber = 0
            const promisesCollections = []
            while (offset <= totalOffset) {
                if (requestNumber > 2) {
                    await delay(2500)
                    requestNumber = 0
                }
                requestNumber++
                const url = `${process.env.MODULE_NFT_BASEURL}/opensea/collection/rankings?sort_by=ONE_DAY_VOLUME&count=${count}&offset=${offset}`
                const getTopCollection = new axios({
                    method: 'get',
                    url: url,
                    headers: {
                        'X-API-KEY': apiKey
                    }
                })
                offset += 100
                promisesCollections.push(getTopCollection)
            }

            const collectionsRequests = await Promise.all(promisesCollections)

            const collectionsData = collectionsRequests
                .filter(
                    (item) => item.status === 200 && item.data.error === null
                )
                .map((item) => {
                    return item.data.rankings
                        .filter(
                            (item) =>
                                item.logo_url !== null &&
                                item.statistics.floor !== null
                        )
                        .map((item) => {
                            return {
                                collection_slug: item.collection_slug,
                                collection_name: item.collection_name,
                                verified: item.verified,
                                logo_url: item.logo_url,
                                floor: item.statistics.floor,
                                owners_count: item.statistics.ownersCount,
                                total_supply: item.statistics.totalSupply,
                                one_day_volume: item.statistics.oneDayVolume,
                                seven_day_volume:
                                    item.statistics.sevenDayVolume,
                                volume_traded: item.statistics.totalVolume,
                                traits: null
                            }
                        })
                })

            const serializeCollection = []

            collectionsData.map((item) => {
                serializeCollection.push(...item)
            })

            const batchCollectionInfo = new loader.BatchCollectionInfo(
                serializeCollection
            )

            const resBatchCollectionInfo = await batchCollectionInfo.init()

            if (resBatchCollectionInfo.status !== 200)
                throw new Error('Invalid Request,try again')

            const finalBatchCollectionInfo =
                resBatchCollectionInfo?.content?.data

            let finalCollectionData = []
            for (let i = 0; i < finalBatchCollectionInfo.length; i++) {
                try {
                    for (let j = 0; j < serializeCollection.length; j++) {
                        try {
                            if (
                                finalBatchCollectionInfo[i]?.collection_slug ===
                                serializeCollection[j]?.collection_slug
                            ) {
                                finalCollectionData.push({
                                    collection_slug:
                                        serializeCollection[j]?.collection_slug,
                                    collection_name:
                                        serializeCollection[j]?.collection_name,
                                    verified: serializeCollection[j]?.verified,
                                    logo_url: serializeCollection[j]?.logo_url,
                                    floor_price: serializeCollection[j]?.floor,
                                    owners_count:
                                        serializeCollection[j]?.owners_count,
                                    total_supply:
                                        serializeCollection[j]?.total_supply,
                                    one_day_volume:
                                        serializeCollection[j]?.one_day_volume,
                                    seven_day_volume:
                                        serializeCollection[j]
                                            ?.seven_day_volume,
                                    volume_traded: String(
                                        parseInt(
                                            serializeCollection[j]
                                                ?.volume_traded
                                        )
                                    ),
                                    contract_address:
                                        finalBatchCollectionInfo[i]
                                            ?.contract_address,
                                    banner_image_url:
                                        finalBatchCollectionInfo[i]
                                            ?.banner_image_url,
                                    description:
                                        finalBatchCollectionInfo[i]
                                            ?.description,
                                    image_url:
                                        finalBatchCollectionInfo[i]?.image_url,
                                    twitter_url:
                                        finalBatchCollectionInfo[i]
                                            ?.twitter_url,
                                    discord_url:
                                        finalBatchCollectionInfo[i]
                                            ?.discord_url,
                                    website_url:
                                        finalBatchCollectionInfo[i]
                                            ?.website_url,
                                    telegram_url:
                                        finalBatchCollectionInfo[i]
                                            ?.telegram_url,
                                    instagram_url:
                                        finalBatchCollectionInfo[i]
                                            ?.instagram_url,
                                    percent_owner:
                                        serializeCollection[j]?.total_supply <
                                        serializeCollection[j]?.owners_count
                                            ? 'N/A'
                                            : String(
                                                  parseInt(
                                                      (parseInt(
                                                          serializeCollection[j]
                                                              ?.owners_count
                                                      ) *
                                                          100) /
                                                          parseInt(
                                                              serializeCollection[
                                                                  j
                                                              ]?.total_supply
                                                          )
                                                  )
                                              ),
                                    is_trending: true
                                })
                            }
                        } catch {
                            continue
                        }
                    }
                } catch {
                    continue
                }
            }

            finalCollectionData = await Promise.all(finalCollectionData)

            console.log(finalCollectionData)

            finalCollectionData.map((item) => {
                Upsert(item, {
                    contract_address: item.contract_address
                })
                    .then(console.log)
                    .catch(console.log)
            })

            return {
                status: 200,
                content: {
                    data: finalCollectionData
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

/*
static #getCollectionTraits = async (collection) => {
        try {
            let apiKey = await sequelize.models.configurations.findOne({
                where: {
                    key: 'ModuleNftApiKey'
                }
            })

            apiKey = _.isEmpty(apiKey) ? null : apiKey?.value

            const resAxios = await axios({
                method: 'get',
                url: `${process.env.MODULE_NFT_BASEURL}/opensea/collection/traits?type=${collection}`,
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
    */
