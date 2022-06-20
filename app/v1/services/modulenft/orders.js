const _ = require('lodash')
const axios = require('axios')
const { sequelize } = require('../../models')

const getTimestampFromIsoTime = (isoTime) => {
    return new Date(isoTime).getTime()
}

const Upsert = (values, condition) => {
    return sequelize.models.orders
        .findOne({ where: condition })
        .then(async (obj) => {
            if (obj) return await obj.update(values)
            return await sequelize.models.orders.create(values)
        })
}

module.exports.GetOrders = class {
    #collection
    constructor(collection) {
        this.#collection = collection
    }
    save = async () => {
        try {
            let apiKey = await sequelize.models.configurations.findOne({
                where: {
                    key: 'ModuleNftApiKey'
                }
            })

            apiKey = _.isEmpty(apiKey) ? null : apiKey?.value
            let offset = 0
            const resAxios = await axios({
                method: 'get',
                url: `${
                    process.env.MODULE_NFT_BASEURL
                }/opensea/orders/salesV2?type=${
                    this.#collection
                }&count=100&currencySymbol=ETH&offset=${offset}`,
                headers: {
                    'X-API-KEY': apiKey
                }
            })

            if (resAxios.status !== 200)
                throw new Error("Can't submit request , please try again")

            if (resAxios.data.error !== null)
                throw new Error(String(resAxios.data.error))

            const orders = resAxios.data.sales
                .filter(
                    (item) =>
                        getTimestampFromIsoTime(item.eventTimestamp) <=
                        Date.now() + 1000 * 60 * 60 * 4
                )
                .map((item) => {
                    return {
                        collectionId: 1,
                        price: item.price,
                        token_id: item.tokenId,
                        image_url: item.image_url,
                        opensea_url: item.permalink,
                        timestamp: getTimestampFromIsoTime(
                            item.eventTimestamp
                        ).toString(),
                        tx_hash: item.txHash
                    }
                })

            for (let j = 0; j < orders.length; j++) {
                try {
                    await Upsert(orders[j], {
                        tx_hash: orders[j].tx_hash
                    })
                } catch {
                    continue
                }
            }

            return {
                status: 200,
                content: {
                    data: orders
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

module.exports.deleteExpiredOrders = async () => {
    try {
        await sequelize.models.orders.destroy({
            where: {
                timestamp: {
                    [Op.gt]: Date.now() + 1000 * 60 * 60 * 4
                }
            }
        })
    } catch (e) {
        return {
            status: 400,
            content: {
                message: e.message
            }
        }
    }
}
