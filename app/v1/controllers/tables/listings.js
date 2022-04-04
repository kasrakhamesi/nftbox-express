const Model = require('../../models').sequelize
const { permissions } = require('../../middlewares')

module.exports.handler = async(req, res) => {
    try {

        const METHOD = req.method
        const { id } = req.params
        const body = req.body
        delete body['id']
        delete body['created_at']
        delete body['updated_at']

        if (req.isAuthenticated(req, res)) {
            const resCheckPermission = await permissions.check(req.user[0].role.id, ['listing_table'])
            if (resCheckPermission != true)
                return res.status(resCheckPermission.status).send(resCheckPermission.content)

            switch (METHOD) {
                case 'POST' : 
                     const resCreateItem = await Model.models.listing_table_items.create(body)
                     return res.status(201).send(resCreateItem)

                case 'GET':
                    const resGetTableItems = await Model.models.listing_table_items.findAndCountAll({
                        order: [
                            ['id', 'DESC']
                        ]
                    })
                    return res.status(200).send(resGetTableItems)

                case 'PUT':
                    const resUpdateTableItem = await Model.models.listing_table_items.update(body, {
                        where: {
                            id: id
                        }
                    })
                    if (resUpdateTableItem == 1) {
                        const resGetTableItems = await Model.models.listing_table_items.findAll({
                            where: {
                                id: id,
                            }
                        })
                        return res.status(200).send(resGetTableItems)
                    } else
                        return res.status(400).send({ message: 'invalid id or something else' })

                case 'DELETE':
                    const resDeleteTableItem = await Model.models.listing_table_items.destroy({
                        where: {
                            id: id
                        }
                    })
                    if (resDeleteTableItem == 1)
                        return res.status(200).send({ result: true })
                    else
                        return res.status(400).send({ message: 'invalid id or something else' })
            }
        }
        res.status(401).send('Unauthorized')
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
}
