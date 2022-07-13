const { sequelize } = require('../../models')
const _ = require('lodash')

module.exports.findAll = async (req, res) => {
    try {
        const { collection } = req.params
        const condition =
            collection.substring(0, 2) !== '0x'
                ? { collection_slug: collection }
                : { contract_address: collection }

        const getCollection = await sequelize.models.collections.findOne({
            where: condition
        })

        if (_.isEmpty(getCollection))
            throw new Error("Can't find this collection")

        const listings = await sequelize.models.listings.findAndCountAll({
            where: {
                collectionId: getCollection.id
            }
        })

        if (_.isEmpty(listings)) throw new Error("Can't find this collection")

        let listingsWithTokensInfo = []

        for (let k = 0; k < listings.length; k++) {
            try {
                const tokenId = listings[k].token_id

                const tokenInfo = await sequelize.models.tokens.findOne({
                    where: { collectionId: getCollection.id, token_id: tokenId }
                })

                listingsWithTokensInfo.push({
                    ...tokenId,
                    ...tokenInfo
                })
            } catch (e) {
                console.log(e)
                continue
            }
        }

        listingsWithTokensInfo = await Promise.all(listingsWithTokensInfo)

        res.status(200).send(listingsWithTokensInfo)
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
}
