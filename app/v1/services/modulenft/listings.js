const _ = require('lodash')
const axios = require('axios')
const { sequelize } = require('../../models')
const pendingCollections = require('./pendings')
const { delay, database } = require('../../utils')

const getTimestampFromIsoTime = (isoTime) => {
    return new Date(isoTime).getTime()
}

module.exports.getListingsChangePercent = async () => {
    try {
        const collections = await sequelize.models.collections.findAll()
        for (let k = 0; k < collections.length; k++) {
            try {
                await new this.GetListings(
                    collections[k].contract_address
                ).save()
            } catch (e) {
                console.log(e)
                continue
            }
        }
    } catch (e) {
        console.log(e)
    }
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
                throw new Error("Can't submit request , please try again")

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
                throw new Error("Can't submit request , please try again")

            const currentCollection =
                await sequelize.models.collections.findOne({
                    where: { contract_address: this.#collection }
                })

            if (_.isEmpty(currentCollection))
                throw new Error("Can't Find This Collection in our database")

            const resNewListings = resAxiosNewListings.data.listings.map(
                (item) => {
                    return {
                        collectionId: resFindCollection.id, // currentCollection.id,
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
                    collectionId: resFindCollection.id, // currentCollection.id,
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

            const timeframe = {
                _1min: null,
                _2min: null,
                _5min: null,
                _10min: null,
                _15min: null,
                _30min: null,
                _1hour: null,
                _2hour: null,
                _6hour: null,
                _12hour: null,
                _1day: null,
                _2day: null,
                _7day: null,
                _14day: null
            }

            allListings.map((item) => {
                if (parseInt(item.timestamp) <= Date.now() + 1000 * 60 * 1)
                    timeframe._1min++
                else if (parseInt(item.timestamp) <= Date.now() + 1000 * 60 * 2)
                    timeframe._2min++
                else if (parseInt(item.timestamp) <= Date.now() + 1000 * 60 * 5)
                    timeframe._5min++
                else if (
                    parseInt(item.timestamp) <=
                    Date.now() + 1000 * 60 * 10
                )
                    timeframe._10min++
                else if (
                    parseInt(item.timestamp) <=
                    Date.now() + 1000 * 60 * 15
                )
                    timeframe._15min++
                else if (
                    parseInt(item.timestamp) <=
                    Date.now() + 1000 * 60 * 30
                )
                    timeframe._30min++
                else if (
                    parseInt(item.timestamp) <=
                    Date.now() + 1000 * 60 * 60 * 1
                )
                    timeframe._1hour++
                else if (
                    parseInt(item.timestamp) <=
                    Date.now() + 1000 * 60 * 60 * 2
                )
                    timeframe._2hour++
                else if (
                    parseInt(item.timestamp) <=
                    Date.now() + 1000 * 60 * 60 * 6
                )
                    timeframe._6hour++
                else if (
                    parseInt(item.timestamp) <=
                    Date.now() + 1000 * 60 * 60 * 12
                )
                    timeframe._12hour++
                else if (
                    parseInt(item.timestamp) <=
                    Date.now() + 1000 * 60 * 60 * 24 * 1
                )
                    timeframe._1day++
                else if (
                    parseInt(item.timestamp) <=
                    Date.now() + 1000 * 60 * 60 * 24 * 2
                )
                    timeframe._2day++
                else if (
                    parseInt(item.timestamp) <=
                    Date.now() + 1000 * 60 * 60 * 24 * 7
                )
                    timeframe._7day++
                else if (
                    parseInt(item.timestamp) <=
                    Date.now() + 1000 * 60 * 60 * 24 * 14
                )
                    timeframe._14day++
            })

            const changePercent = {
                _1min: String((timeframe._1min / timeframe._2min) * 100) + ' %',
                _5min:
                    String((timeframe._5min / timeframe._10min) * 100) + ' %',
                _15min:
                    String((timeframe._15min / timeframe._30min) * 100) + ' %',
                _1hour:
                    String((timeframe._1hour / timeframe._2hour) * 100) + ' %',
                _6hour:
                    String((timeframe._6hour / timeframe._12hour) * 100) + ' %',
                _12hour:
                    String((timeframe._12hour / timeframe._1day) * 100) + ' %',
                _1day: String((timeframe._1day / timeframe._2day) * 100) + ' %',
                _7day: String((timeframe._7day / timeframe._14day) * 100) + ' %'
            }

            /*
               one_minute_floor_price_change_percent: null,

                five_minute_floor_price_change_percent: null,

                fifteen_minute_floor_price_change_percent: null,
                one_hour_floor_price_change_percent: null,

                six_hour_floor_price_change_percent: null,

                twelve_hour_floor_price_change_percent: null,
                one_day_floor_price_change_percent: null,

                seven_day_floor_price_change_percent: null,
// SALES

one_minute_market_cap_change_percent: null,

                five_minute_market_cap_change_percent: null,

                fifteen_minute_market_cap_change_percent: null,

                one_hour_market_cap_change_percent: null,

                six_hour_market_cap_change_percent: null,
                twelve_hour_market_cap_change_percent: null,

                one_day_market_cap_change_percent: null,

                seven_day_market_cap_change_percent: null,

                one_minute_sales_change_percent: null,

                five_minute_sales_change_percent: null,

                fifteen_minute_sales_change_percent: null,

                one_hour_sales_change_percent: null,
                six_hour_sales_change_percent: null,

                twelve_hour_sales_change_percent: null,

                one_day_sales_change_percent: null,

                seven_day_sales_change_percent: null,

                // VOLUME
                 one_minute_volume_change_percent: null,

                five_minute_volume_change_percent: null,

                fifteen_minute_volume_change_percent: null,
                one_hour_volume_change_percent: null,

                six_hour_volume_change_percent: null,

                twelve_hour_volume_change_percent: null,

                one_day_volume_change_percent: null,

                seven_day_volume_change_percent: null

*/
            /*
            for (let j = 0; j < _4hourListings.length; j++) {
                try {
                    await database.upsert(
                        _4hourListings[j],
                        {
                            token_id: _4hourListings[j].token_id
                        },
                        sequelize.models.listings
                    )
                } catch {
                    continue
                }
            }

            await database.upsert(
                {
                    collectionId: resFindCollection.id,
                    one_minute_listings_change_percent: changePercent._1min,
                    five_minute_listings_change_percent: changePercent._5min,
                    fifteen_minute_listings_change_percent:
                        changePercent._15min,
                    one_hour_listings_change_percent: changePercent._1hour,
                    six_hour_listings_change_percent: changePercent._6hour,
                    twelve_hour_listings_change_percent: changePercent._12hour,
                    one_day_listings_change_percent: changePercent._1day,
                    seven_day_listings_change_percent: changePercent._7day
                },
                {
                    collectionId: resFindCollection.id
                },
                sequelize.models.percent_collections
            )
            */

            return {
                status: 200,
                content: {
                    data: allListings
                }
            }
        } catch (e) {
            // console.log(e)
            return {
                status: 400,
                content: {
                    message: e.message
                }
            }
        }
    }
}
