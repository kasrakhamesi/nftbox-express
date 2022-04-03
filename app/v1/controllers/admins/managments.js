const Model = require('../../models').sequelize
const { permissions } = require('../../middlewares')
const managments = {}

managments.admins = async(req, res) => {
    try {

        const METHOD = req.method
        const { id } = req.params
        const body = req.body
        delete body['id']
        delete body['created_at']
        delete body['updated_at']

        if (req.isAuthenticated(req, res)) {
            const resCheckPermission = await permissions.check(req.user[0].role.id, ['admins'])
            if (resCheckPermission != true)
                return res.status(resCheckPermission.status).send(resCheckPermission.content)

            switch (METHOD) {
                case 'GET':
                    const resGetAdmins = await Model.models.admins.findAndCountAll({
                        order: [
                            ['id', 'DESC']
                        ]
                    })
                    return res.status(200).send(resGetAdmins)

                case 'PUT':
                    const resUpdateAdmin = await Model.models.admins.update(body, {
                        where: {
                            id: id
                        }
                    })
                    if (resUpdateAdmin == 1) {
                        const resGetAdmin = await Model.models.admins.findAll({
                            where: {
                                id: id,
                            }
                        })
                        return res.status(200).send(resGetAdmin)
                    } else
                        return res.status(400).send({ message: 'invalid id or something else' })

                case 'DELETE':
                    const resDeleteAdmin = await Model.models.admins.destroy({
                        where: {
                            id: id
                        }
                    })
                    if (resDeleteAdmin == 1)
                        return res.status(200).send({ result: true })
                    else
                        return res.status(400).send({ message: 'invalid id or something else' })
            }
        }
        res.status(401).send('Unauthorized')
    } catch (e) {
        res.status(400).send({ message: String(e.message) })
    }
}

managments.adminsRoles = async(req, res) => {
    try {

        const METHOD = req.method
        const { id } = req.params
        const body = req.body
        delete body['id']
        delete body['created_at']
        delete body['updated_at']

        if (req.isAuthenticated(req, res)) {
            const resCheckPermission = await permissions.check(req.user[0].role.id, ['admins_roles'])
            if (resCheckPermission != true)
                return res.status(resCheckPermission.status).send(resCheckPermission.content)

            switch (METHOD) {
                case 'POST':
                    const resCreate = await Model.models.admins_roles.create(body)
                    return res.status(201).send(resCreate)

                case 'GET':
                    const resGetAdmins = await Model.models.admins_roles.findAndCountAll({
                        order: [
                            ['id', 'DESC']
                        ]
                    })
                    return res.status(200).send(resGetAdmins)

                case 'PUT':
                    const resUpdateAdmin = await Model.models.admins_roles.update(body, {
                        where: {
                            id: id
                        }
                    })
                    if (resUpdateAdmin == 1) {
                        const resGetAdmin = await Model.models.admins_roles.findAll({
                            where: {
                                id: id,
                            }
                        })
                        return res.status(200).send(resGetAdmin)
                    } else
                        return res.status(400).send({ message: 'invalid id or something else' })

                case 'DELETE':
                    const resDeleteAdmin = await Model.models.admins_roles.destroy({
                        where: {
                            id: id
                        }
                    })
                    if (resDeleteAdmin == 1)
                        return res.status(200).send({ result: true })
                    else
                        return res.status(400).send({ message: 'invalid id or something else' })
            }
        }
        res.status(401).send('Unauthorized')
    } catch (e) {
        res.status(400).send({ message: String(e.message) })
    }
}


managments.adminsPermissions = async(req, res) => {
    try {

        const METHOD = req.method
        const { id } = req.params
        const { perm_description } = req.body

        if (req.isAuthenticated(req, res)) {
            const resCheckPermission = await permissions.check(req.user[0].role.id, ['admins_roles'])
            if (resCheckPermission != true)
                return res.status(resCheckPermission.status).send(resCheckPermission.content)

            switch (METHOD) {
                case 'GET':
                    const resGetAdmins = await Model.models.admins_permissions.findAndCountAll()
                    return res.status(200).send(resGetAdmins)

                case 'PUT':
                    const resUpdateAdmin = await Model.models.admins_permissions.update({ perm_description: perm_description }, {
                        where: {
                            id: id
                        }
                    })
                    if (resUpdateAdmin == 1) {
                        const resGetAdmin = await Model.models.admins_permissions.findAll({
                            where: {
                                id: id,
                            }
                        })
                        return res.status(200).send(resGetAdmin)
                    } else
                        return res.status(400).send({ message: 'invalid id or something else' })
            }
        }
        res.status(401).send('Unauthorized')
    } catch (e) {
        res.status(400).send({ message: String(e.message) })
    }
}

managments.adminsRolesPermissions = async(req, res) => {
    try {

        const METHOD = req.method
        const { id } = req.params
        const body = req.body
        delete body['id']
        delete body['created_at']
        delete body['updated_at']

        console.log('raf')
        if (req.isAuthenticated(req, res)) {
            const resCheckPermission = await permissions.check(req.user[0].role.id, ['admins_roles'])
            if (resCheckPermission != true)
                return res.status(resCheckPermission.status).send(resCheckPermission.content)

            switch (METHOD) {
                case 'POST':
                    const resCreate = await Model.models.admins_role_perm.create(body)
                    return res.status(201).send(resCreate)

                case 'GET':
                    const resGetAdmins = await Model.models.admins_role_perm.findAndCountAll({
                        order: [
                            ['id', 'DESC']
                        ]
                    })
                    return res.status(200).send(resGetAdmins)

                case 'PUT':
                    const resUpdateAdmin = await Model.models.admins_role_perm.update(body, {
                        where: {
                            id: id
                        }
                    })
                    if (resUpdateAdmin == 1) {
                        const resGetAdmin = await Model.models.admins_role_perm.findAll({
                            where: {
                                id: id,
                            }
                        })
                        return res.status(200).send(resGetAdmin)
                    } else
                        return res.status(400).send({ message: 'invalid id or something else' })

                case 'DELETE':
                    const resDeleteAdmin = await Model.models.admins_role_perm.destroy({
                        where: {
                            id: id
                        }
                    })
                    if (resDeleteAdmin == 1)
                        return res.status(200).send({ result: true })
                    else
                        return res.status(400).send({ message: 'invalid id or something else' })
            }
        }
        res.status(401).send('Unauthorized')
    } catch (e) {
        res.status(400).send({ message: String(e.message) })
    }
}

module.exports = managments