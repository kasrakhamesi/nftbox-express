const Model = require('../../models').sequelize
const { restful, response } = require('../../libs')
const api = new restful(Model.models.admins, ['admins'])

module.exports = {
    create: async (req, res) => {
        let body = req.body
        delete body['id']
        body['roleId'] = 2
        return response(await api.Post({ body: body, req: req, res: res }), res)
    },
    update: async (req, res) => {
        const { id } = req.params
        let body = req.body
        delete body['id']
        delete body['roleId']
        const condition = {
            id: id
        }
        return response(
            await api.Put({ body: body, req: req, res: res, where: condition }),
            res
        )
    },
    findAll: async (req, res) => {
        const include = [
            {
                model: Model.models.admins_roles,
                as: 'role',
                include: {
                    model: Model.models.admins_permissions,
                    as: 'permissions',
                    through: {
                        attributes: {
                            exclude: [
                                'createdAt',
                                'updatedAt',
                                'permId',
                                'roleId'
                            ]
                        }
                    }
                }
            }
        ]
        return response(
            await api.Get({
                attributes: { exclude: ['roleId'] },
                include: include,
                res: res,
                req: req
            }),
            res
        )
    },
    findOne: async (req, res) => {
        const { id } = req.params
        const include = [
            {
                model: Model.models.admins_roles,
                as: 'role',
                include: {
                    model: Model.models.admins_permissions,
                    as: 'permissions',
                    through: {
                        attributes: {
                            exclude: [
                                'createdAt',
                                'updatedAt',
                                'permId',
                                'roleId'
                            ]
                        }
                    }
                }
            }
        ]
        return response(
            await api.Get({
                attributes: { exclude: ['roleId'] },
                include: include,
                where: { id: id },
                res: res,
                req: req
            }),
            res
        )
    },
    delete: async (req, res) => {
        const { id } = req.params
        if (parseInt(id) === 1)
            return res
                .status(400)
                .send({ message: "you can't delete the founder account" })
        return response(
            await api.Delete({ where: { id: id }, req: req, res: res }),
            res
        )
    }
}
