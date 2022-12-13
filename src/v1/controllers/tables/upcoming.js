const Model = require('../../models').sequelize
const { restful, response } = require('../../libs')
const api = new restful(Model.models.upcomings, ['upcoming_table'])
const categoriesApi = new restful(Model.models.categories, ['upcoming_table'])
const upcomingCategoriesApi = new restful(Model.models.upcoming_categories, [
    'upcoming_table'
])
const { sequelize } = require('../../models')

module.exports.create = async (req, res) => {
    try {
        const { categories } = req.body

        if (!categories)
            return res.status(400).send({
                message: 'please select categories for this item.'
            })

        for (let i = 0; i < categories.length; i++) {
            try {
                const resCheck = await categoriesApi.Get({
                    where: {
                        id: categories[i].id
                    },
                    res: res,
                    req: req
                })
                if (resCheck.status !== 200)
                    return res.status(404).send({
                        message: `category id not found , please try again`
                    })
            } catch (e) {
                return res.status(400).send({ message: e.message })
            }
        }

        const resCreate = await api.Post({
            body: req.body,
            res: res,
            req: req,
            haveLog: true,
            logDescription: `a Admin try to create table`
        })

        for (let k = 0; k < categories.length; k++) {
            try {
                await upcomingCategoriesApi.Post({
                    body: {
                        upcomingId: resCreate.content.id,
                        categoryId: categories[k].id
                    },
                    res: res,
                    req: req
                })
            } catch {
                continue
            }
        }

        const include = [
            {
                model: Model.models.categories,
                as: 'categories',
                attributes: {
                    exclude: ['display_name']
                },
                through: {
                    attributes: {
                        exclude: [
                            'upcomingId',
                            'categoryId',
                            'createdAt',
                            'updatedAt'
                        ]
                    }
                }
            }
        ]

        const response = await api.Get({
            where: { id: resCreate.content.id },
            res: res,
            req: req,
            include: include
        })
        res.status(201).send(response.content)
    } catch (e) {
        res.status(400).send({
            message: e.message
        })
    }
}

module.exports.findAll = async (req, res) => {
    const include = [
        {
            model: Model.models.categories,
            as: 'categories',
            attributes: {
                exclude: ['display_name']
            },
            through: {
                attributes: {
                    exclude: [
                        'upcomingId',
                        'categoryId',
                        'createdAt',
                        'updatedAt'
                    ]
                }
            }
        }
    ]
    return response(
        await api.Get({
            res: res,
            req: req,
            include: include
        }),
        res
    )
}

module.exports.findOne = async (req, res) => {
    const { id } = req.params

    const include = [
        {
            model: Model.models.categories,
            as: 'categories',
            attributes: {
                exclude: ['display_name']
            },
            through: {
                attributes: {
                    exclude: [
                        'upcomingId',
                        'categoryId',
                        'createdAt',
                        'updatedAt'
                    ]
                }
            }
        }
    ]
    return response(
        await api.Get({
            where: { id: id },
            res: res,
            req: req,
            include: include
        }),
        res
    )
}

module.exports.update = async (req, res) => {
    try {
        const { id } = req.params
        let body = req.body
        delete body['id']
        delete body['createdAt']
        delete body['updatedAt']

        return Model.models.upcomings
            .findByPk(id, {
                include: [
                    {
                        model: Model.models.categories,
                        as: 'categories'
                    }
                ]
            })
            .then(async (result) => {
                if (!result) {
                    throw new Error({
                        message: `Can't find Upcoming data.`
                    })
                }

                let categoryIds = []
                await req.body.categories.forEach((item) => {
                    categoryIds.push(item.id)
                })
                await result.setCategories(categoryIds)
                delete req.body.categories
                await result.set(req.body)

                return await sequelize.transaction((t) => {
                    return result
                        .save({
                            transaction: t
                        })
                        .then((updatedresult) => {
                            updatedresult.save()
                        })
                })
            })
            .then(() => {
                return res.status(200).send({
                    result: true,
                    message: 'successfully updated.'
                })
            })
            .catch(() => {
                return res.status(400).send({
                    message: `Can't find category data.`
                })
            })
    } catch (e) {
        res.status(400).send({
            message: e.message
        })
    }
}

module.exports.delete = async (req, res) => {
    const { id } = req.params
    return response(
        await api.Delete({
            where: { id: id },
            req: req,
            res: res,
            haveLog: true,
            logDescription: `a Admin try to Delete Table with id : ${id}`
        }),
        res
    )
}

module.exports.deleteAll = async (req, res) => {
    return res.status(404).send('<h1>404 Not Found</h1>')
}

module.exports.Users = {
    findAll: async (req, res) => {
        const include = [
            {
                model: Model.models.categories,
                as: 'categories',
                attributes: {
                    exclude: ['display_name']
                },
                through: {
                    attributes: {
                        exclude: [
                            'upcomingId',
                            'categoryId',
                            'createdAt',
                            'updatedAt'
                        ]
                    }
                }
            }
        ]
        const attributes = {
            exclude: [
                'access_key',
                'enable_access_key',
                'hidden',
                'is_automatic_check',
                'is_upcoming',
                'sortorder'
            ]
        }
        return response(
            await api.Get({
                res: res,
                req: req,
                attributes: attributes,
                include: include,
                checkJwt: false,
                checkRole: false
            }),
            res
        )
    },
    findOne: async (req, res) => {
        const { id } = req.params

        const include = [
            {
                model: Model.models.categories,
                as: 'categories',
                attributes: {
                    exclude: ['display_name']
                },
                through: {
                    attributes: {
                        exclude: [
                            'upcomingId',
                            'categoryId',
                            'createdAt',
                            'updatedAt'
                        ]
                    }
                }
            }
        ]
        const attributes = {
            exclude: [
                'access_key',
                'enable_access_key',
                'hidden',
                'is_automatic_check',
                'is_upcoming',
                'sortorder'
            ]
        }
        return response(
            await api.Get({
                where: { id: id },
                attributes: attributes,
                res: res,
                req: req,
                include: include,
                checkJwt: false,
                checkRole: false
            }),
            res
        )
    }
}
