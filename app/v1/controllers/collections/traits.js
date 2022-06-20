const Model = require('../../models').sequelize
const { restful, response } = require('../../libs')
const api = new restful(Model.models.collections_traits, ['collections_traits'])

module.exports.Users = {
    findAll: async (req, res) => {
        return response(
            await api.Get({
                res: res,
                req: req,
                checkJwt: false,
                checkRole: false
            }),
            res
        )
    },
    findOne: async (req, res) => {
        const { id } = req.params
        let q = await api.Get({
            where: { id: id },
            res: res,
            req: req,
            checkJwt: false,
            checkRole: false
        })
        console.log(q)
        q = q.content
        q['traits'] = JSON.parse(q.traits)
        return res.send(q)
    }
}
