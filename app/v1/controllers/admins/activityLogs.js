const { restful, response } = require('../../libs')
const { sequelize } = require('../../models')
const api = new restful(sequelize.models.activitylogs, ['activitylogs'])

module.exports.findAll = async (req, res) => {
    const include = {
        model: sequelize.models.admins,
        as: 'admin',
        attributes: { exclude: ['roleId'] }
    }
    const attributes = { exclude: ['adminId'] }
    return response(
        await api.Get({
            attributes: attributes,
            include: include,
            res: res,
            req: req
        }),
        res
    )
}

module.exports.findOne = async (req, res) => {
    const { id } = req.params
    const include = {
        model: sequelize.models.admins,
        as: 'admin',
        attributes: { exclude: ['roleId'] }
    }
    const attributes = { exclude: ['adminId'] }
    return response(
        await api.Get({
            attributes: attributes,
            include: include,
            where: { id: id },
            res: res,
            req: req
        }),
        res
    )
}

module.exports.delete = async (req, res) => {
    const { id } = req.params
    return response(
        await api.Delete({
            where: { id: id },
            req: req,
            res: res
        }),
        res
    )
}

module.exports.deleteAll = async (req, res) => {
    return response(
        {
            status: 200,
            content: {
                result: true,
                message: 'successfully deleted.'
            }
        },
        res
    )
}
