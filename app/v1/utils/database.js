module.exports.upsert = (values, condition, models) => {
    return models.findOne({ where: condition }).then(async (obj) => {
        if (obj) return await obj.update(values)
        return await models.create(values)
    })
}
