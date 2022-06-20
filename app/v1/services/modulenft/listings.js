const _ = require('lodash')
const axios = require('axios')
const { sequelize } = require('../../models')
const pendingCollections = require('./pendings')
const { delay } = require('../../utils')

const Upsert = (values, condition) => {
    return sequelize.models.listings
        .findOne({ where: condition })
        .then(async (obj) => {
            if (obj) return await obj.update(values)
            return await sequelize.models.listings.create(values)
        })
}

const getTimestampFromIsoTime = (isoTime) => {
    return new Date(isoTime).getTime()
}

module.exports.GetListings = class {
    #collection
    constructor(collection) {
        this.#collection = collection
    }
    save = async () => {
        try {
            const resFindCollection =
                await sequelize.models.collections.findOne({
                    where: {
                        contract_address: this.#collection
                    }
                })

            if (_.isEmpty(resFindCollection)) {
                await pendingCollections.savePending(this.#collection)
                throw new Error(
                    "We Don't Have This Collection In Our database. So , saved in pending collections to get information"
                )
            }

            let apiKey = await sequelize.models.configurations.findOne({
                where: {
                    key: 'ModuleNftApiKey'
                }
            })

            apiKey = _.isEmpty(apiKey) ? null : apiKey?.value

            const resAxiosNewListings = await axios({
                method: 'get',
                url: `${
                    process.env.MODULE_NFT_BASEURL
                }/opensea/listings/new-listings?type=${
                    this.#collection
                }&currencySymbol=ETH`,
                headers: {
                    'X-API-KEY': apiKey
                }
            })

            if (resAxiosNewListings.status !== 200)
                throw new Error("Can't submit request , please try again")

            if (resAxiosNewListings.data.error !== null)
                throw new Error(String(resAxiosNewListings.data.error))

            await delay.wait(600)

            const resAxiosListings = await axios({
                method: 'get',
                url: `${
                    process.env.MODULE_NFT_BASEURL
                }/opensea/listings/listings?type=${
                    this.#collection
                }&currencySymbol=ETH`,
                headers: {
                    'X-API-KEY': apiKey
                }
            })

            if (resAxiosListings.status !== 200)
                throw new Error("Can't submit request , please try again")

            if (resAxiosListings.data.error !== null)
                throw new Error(String(resAxiosListings.data.error))

            const currentCollection =
                await sequelize.models.collections.findOne({
                    where: { contract_address: this.#collection }
                })

            if (_.isEmpty(currentCollection))
                throw new Error("Can't Find This Collection in our database")

            const resNewListings = resAxiosNewListings.data.listings.map(
                (item) => {
                    return {
                        collectionId: 1, // currentCollection.id,
                        price: item.price,
                        token_id: parseInt(item.tokenId),
                        image_url: item.image_url,
                        opensea_url: item.permalink,
                        timestamp: getTimestampFromIsoTime(
                            item.eventTimestamp
                        ).toString()
                    }
                }
            )

            const resListingsV1 = resAxiosListings.data.listings.map((item) => {
                return {
                    collectionId: 1, // currentCollection.id,
                    price: item.price,
                    token_id: parseInt(item.tokenId),
                    image_url: item.image_url,
                    opensea_url: item.permalink,
                    timestamp: getTimestampFromIsoTime(
                        item.eventTimestamp
                    ).toString()
                }
            })

            const allListings = [...resNewListings, ...resListingsV1]

            const _4hourListings = allListings
                .filter(
                    (item) =>
                        parseInt(item.timestamp) <=
                        Date.now() + 1000 * 60 * 60 * 4
                )
                .map((item) => {
                    return item
                })

            for (let j = 0; j < _4hourListings.length; j++) {
                try {
                    await Upsert(_4hourListings[j], {
                        token_id: _4hourListings[j].token_id
                    })
                } catch {
                    continue
                }
            }

            return {
                status: 200,
                content: {
                    data: allListings
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
