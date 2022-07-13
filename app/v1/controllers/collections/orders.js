const { sequelize } = require('../../models')

module.exports.findAll = async (req, res) => {
    try {
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
