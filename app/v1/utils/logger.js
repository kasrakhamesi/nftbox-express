const { sequelize } = require('../models')

const logger = (adminId, description) => {
    sequelize.models.activitylogs
        .create({
            adminId: adminId,
            description: description,
            created_date: String(Date.now())
        })
        .then(console.log)
        .catch(console.log)
}

module.exports = logger
