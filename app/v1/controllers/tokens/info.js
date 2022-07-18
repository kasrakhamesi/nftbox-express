const { sequelize } = require('../../models')
const _ = require('lodash')

module.exports.getTokens = async (req, res) => {
    try {
        const { collection, tokenId } = req.params
        const condition =
            collection.substring(0, 2) !== '0x'
                ? { collection_slug: collection }
                : { contract_address: collection }

        const getCollection = await sequelize.models.collections.findOne({
            where: condition
        })

        if (_.isEmpty(getCollection))
            throw new Error("Can't find this collection")

        let tokens = await sequelize.models.tokens.findOne({
            where: { collectionId: getCollection.id, token_id: tokenId },
            attributes: {
                exclude: ['collectionId']
            }
        })

        if (_.isEmpty(tokens)) return res.status(200).send({})

        tokens.string_traits = JSON.parse(tokens.string_traits)
        tokens.numeric_traits = JSON.parse(tokens.numeric_traits)

        res.status(200).send(tokens)
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
}
