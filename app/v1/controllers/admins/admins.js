const Model = require('../../models').sequelize
const { permissions,authurize } = require('../../middlewares')
const admins = {}

admins.register = async(req, res) => {
    try {
        const body = req.body
        delete body['id']
        if (req.isAuthenticated(req, res)) {
            const resCheckPermission = await permissions.check(req.user[0].role.id, ['admins'])
            if (resCheckPermission != true)
                return res.status(resCheckPermission.status).send(resCheckPermission.content)

            const resRegisterAdmin = await Model.models.admins.create(body)
            return res.status(201).send(resRegisterAdmin)
        }
        res.status(401).send('Unauthorized')
    } catch (e) {
        res.status(400).send({ message: String(e.message) })
    }
}


admins.login = async(req, res) => {
    try {
        const { email, password } = req.body

        if (email && password) {
            const loginCheck = await Model.models.admins.findAll({
                where: {
                    email: email,
                    password: password
                },
                include: { model: Model.models.admins_roles, as: 'role' }
            })

            if (loginCheck[0] != null) {
                const jwtToken= authurize.jwt(loginCheck[0])
                const reqAdmins = (loginCheck).map(item => {
                    return {
                        id: item.id,
                        role: {
                            id: item.role.id,
                            role_name: item.role.role_name,
                            color: item.role.color,
                            createdAt: item.role.createdAt,
                            updatedAt: item.role.updatedAt
                        },
                        name: item.name,
                        email: item.email,
                        password: item.password,
                        last_login: item.last_login,
                        activated: item.activated,
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt,
                        token : {
                            access_token: jwtToken,
                            expire: authurize.managerDecodeJwt(jwtToken).exp
                        }
                    }
                })
                return res.status(200).send(reqAdmins)
            }
        }
        res.status(400).send({ login: false,  message: "invalid input" })
    } catch (e) {
        res.status(400).send({ message: String(e.message) })
    }
}

admins.dashboard = async(req, res) => {
    try {
        if (req.isAuthenticated(req, res))
            return res.status(200).send(req.user)

        res.status(401).send('Unauthorized')
    } catch {
        res.status(400).send({ message: 'something is wrong' })
    }
}

admins.edit = async(req, res) => {
    try {

        const { id } = req.params
        const body = req.body
        delete body['id']

        if (req.isAuthenticated(req, res)) {

            const resCheckPermission = await permissions.check(req.user[0].role.id, ['admins'])
            if (resCheckPermission != true)
                return res.status(resCheckPermission.status).send(resCheckPermission.content)
          
            const resUpdateAdmin = await Model.models.admins.update(body, {
                where: {
                    id: id
                }
            })
            if (resUpdateAdmin == 1) {
                const resGetAdminData = await Model.models.admins.findAll({
                    where: {
                        id: id,
                    },
                    include: { model: Model.models.admins_roles, as: 'role' }
                })
                const adminsInfo = (resGetAdminData).map(item => {
                    return {
                        id: item.id,
                        role: {
                            id: item.role.id,
                            role_name: item.role.role_name,
                            color: item.role.color,
                            createdAt: item.role.createdAt,
                            updatedAt: item.role.updatedAt
                        },
                        name: item.name,
                        email: item.email,
                        password: item.password,
                        last_login: item.last_login,
                        activated: item.activated,
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt,
                    }
                })
                return res.status(200).send(adminsInfo)
            } else
                return res.status(400).send({ message: 'invalid id or something else' })
            }

        res.status(401).send('Unauthorized')
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
}

module.exports = admins