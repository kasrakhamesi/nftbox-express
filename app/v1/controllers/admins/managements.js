const Model = require('../../models').sequelize
const { restful, response } = require('../../libs')
const rolesApi = new restful(Model.models.admins_roles, ['admins_roles'])
const permissionsApi = new restful(Model.models.admins_permissions, [
    'admins_roles'
])
const rolePermissionsApi = new restful(Model.models.admins_role_perm, [
    'admins_roles'
])

module.exports.adminsRoles = {
    create: async (req, res) => {
        return response(
            await rolesApi.Post({ body: req.body, res: res, req: req }),
            res
        )
    },
    findAll: async (req, res) => {
        return response(await rolesApi.Get({ res: res, req: req }), res)
    },
    findOne: async (req, res) => {
        const { id } = req.params
        return response(
            await rolesApi.Get({ where: { id: id }, res: res, req: req }),
            res
        )
    },
    delete: async (req, res) => {
        const { id } = req.params
        return response(
            await rolesApi.Delete({ where: { id: id }, req: req, res: res }),
            res
        )
    },
    update: async (req, res) => {
        const { id } = req.params
        let body = req.body
        delete body['id']
        delete body['createdAt']
        delete body['updatedAt']

        return response(
            await rolesApi.Put({
                body: body,
                where: { id: id },
                req: req,
                res: res
            }),
            res
        )
    },
    delete: async (req, res) => {
        const { id } = req.params
        return response(
            await rolesApi.Delete({ where: { id: id }, req: req, res: res }),
            res
        )
    }
}

module.exports.adminsPermissions = {
    findAll: async (req, res) => {
        return response(await permissionsApi.Get({ res: res, req: req }), res)
    },
    findOne: async (req, res) => {
        const { id } = req.params
        return response(
            await permissionsApi.Get({ where: { id: id }, res: res, req: req }),
            res
        )
    },
    update: async (req, res) => {
        const { id } = req.params
        const { perm_description } = req.body

        return response(
            await permissionsApi.Put({
                body: { perm_description: perm_description },
                where: { id: id },
                req: req,
                res: res
            }),
            res
        )
    }
}

module.exports.adminsRolesPermissions = {
    create: async (req, res) => {
        return response(
            await rolePermissionsApi.Post({
                body: req.body,
                res: res,
                req: req
            }),
            res
        )
    },
    findAll: async (req, res) => {
        return response(
            await rolePermissionsApi.Get({ res: res, req: req }),
            res
        )
    },
    findOne: async (req, res) => {
        const { id } = req.params
        return response(
            await rolePermissionsApi.Get({
                where: { id: id },
                res: res,
                req: req
            }),
            res
        )
    },
    delete: async (req, res) => {
        const { id } = req.params
        return response(
            await rolePermissionsApi.Delete({
                where: { id: id },
                req: req,
                res: res
            }),
            res
        )
    },
    update: async (req, res) => {
        const { id } = req.params
        let body = req.body
        delete body['id']
        delete body['createdAt']
        delete body['updatedAt']

        return response(
            await rolePermissionsApi.Put({
                body: body,
                where: { id: id },
                req: req,
                res: res
            }),
            res
        )
    },
    delete: async (req, res) => {
        const { id } = req.params
        return response(
            await rolePermissionsApi.Delete({
                where: { id: id },
                req: req,
                res: res
            }),
            res
        )
    }
}
