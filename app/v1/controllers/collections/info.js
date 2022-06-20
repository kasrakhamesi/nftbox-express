const { sequelize } = require('../../models')
const _ = require('lodash')

module.exports.getInfo = async (req, res) => {
    try {
        const { collection } = req.params
        const condition =
            collection.substring(0, 2) !== '0x'
                ? { slug: collection }
                : { contract_address: collection }

        const getCollection = await sequelize.models.collections.findOne({
            where: condition,
            attributes: [
                'id',
                'logo_url',
                'banner_image_url',
                'image_url',
                'verified',
                'instagram_url',
                'twitter_url',
                'discord_url',
                'website_url',
                'telegram_url',
                'description',
                'nft_royalty',
                'sales_volume',
                'volume_traded',
                'floor_price',
                'percent_owner',
                'owners_count',
                'total_supply',
                'collection_slug',
                'collection_name',
                'contract_address'
            ]
        })

        if (_.isEmpty(getCollection))
            return res
                .status(404)
                .send({ message: "Can't find your collection" })

        res.status(200).send(getCollection)
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
}
