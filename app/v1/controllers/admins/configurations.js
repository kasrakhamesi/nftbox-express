const Model = require('../../models').sequelize
const { restful, response } = require('../../libs')
const api = new restful(Model.models.configurations, ['configurations'])

module.exports = {
    update: async (req, res) => {
        const { id } = req.params
        let body = req.body
        delete body['id']
        delete body['key']
        delete body['title']

        const condition = {
            id: id
        }
        return response(
            await api.Put({ body: body, req: req, res: res, where: condition }),
            res
        )
    },
    findAll: async (req, res) => {
        return response(
            await api.Get({ where: { is_global: false }, res: res, req: req }),
            res
        )
    }
}
