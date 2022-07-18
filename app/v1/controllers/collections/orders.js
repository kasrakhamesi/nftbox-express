const { sequelize } = require('../../models')

module.exports.findAll = async (req, res) => {
    try {
        return res.status(200).send({
            price: '0.2',
            token_rank: 2,
            token_id: 1,
            tx_hash: 'asdasdasdwqdasd',
            tokens: {
                token_id: 1,
                token_name: 'WZRD #100',
                token_url: 'https://wzrds.xyz/metadata/100',
                token_description:
                    'An epic saga, about the story of WZRDS and their Kingdom of Tyrol.',
                color: null,
                type: 'Common',
                string_traits: [
                    { value: 'No Element', trait_type: 'Element' },
                    { value: 'Human', trait_type: 'Body' },
                    { value: 'Gray Hair', trait_type: 'Hair Color' },
                    { value: 'Still Got it Hair', trait_type: 'Hair' },
                    { value: 'Dialated', trait_type: 'Eyes' },
                    { value: 'Always Angry', trait_type: 'Brows' },
                    { value: 'Mushroom', trait_type: 'Nose' },
                    { value: 'Frown', trait_type: 'Mouth' },
                    { value: 'No Beard', trait_type: 'Beard' },
                    { value: 'Pervy', trait_type: 'Stache' },
                    { value: '“Nice” Vest', trait_type: 'Top' },
                    { value: 'Stinky Poopy Hat', trait_type: 'Hat' },
                    { value: 'Basic Wooden Staff', trait_type: 'Prop' },
                    { value: 'Cloudy Red', trait_type: 'Background' }
                ],
                numeric_traits: null,
                basic_rank: 123,
                norm_rank: 42,
                weight_rank: 23,
                basic_score: 21.4,
                norm_score: 23,
                weight_score: 123,
                token_image:
                    'https://wzrds.s3.amazonaws.com/images/9d35fe8999e13f802bfe2d3b.png'
            },
            image_url:
                'https://wzrds.s3.amazonaws.com/images/16179403bf8cda017d3e9c14.png',
            opensea_url: 'https://opensea.io',
            timestamp: Date.now()
        })

        const { collection } = req.params
        const condition =
            collection.substring(0, 2) !== '0x'
                ? { collection_slug: collection }
                : { contract_address: collection }
        const orders = await sequelize.models.orders.findAndCountAll({
            where: condition
        })

        res.status(200).send(orders)
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
}
