const { sequelize } = require('../../models')
const _ = require('lodash')

module.exports.getInfo = async (req, res) => {
    try {
        const { collection } = req.params
        const condition =
            collection.substring(0, 2) !== '0x'
                ? { collection_slug: collection }
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
                'contract_address',
                'average_price'
            ]
        })

        if (_.isEmpty(getCollection))
            return res
                .status(404)
                .send({ message: "Can't find your collection" })

        const are = Array(getCollection).map((item) => {
            return {
                id: item.id,
                logo_url: item.logo_url,
                banner_image_url: item.banner_image_url,
                image_url: item.image_url,
                verified: item.verified,
                instagram_url: item.instagram_url,
                twitter_url: item.twitter_url,
                discord_url: item.discord_url,
                website_url: item.website_url,
                telegram_url: item.telegram_url,
                description: item.description,
                nft_royalty: item.nft_royalty,
                sales_volume: item.sales_volume,
                volume_traded: item.volume_traded,
                floor_price: item.floor_price,
                percent_owner: item.percent_owner,
                owners_count: item.owners_count,
                total_supply: item.total_supply,
                collection_slug: item.collection_slug,
                collection_name: item.collection_name,
                contract_address: item.contract_address,
                average_price: item.average_price,
                collection_creation_date: Date.now(),
                opensea_url: 'https://google.com'
            }
        })
        res.status(200).send(are[0])
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
}
