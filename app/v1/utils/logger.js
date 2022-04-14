const Model = require('../../models').sequelize

const logger = (adminId,description) => {
    Model.models.activitylogs.create({adminId : adminId , description : description , created_date : String(Date.now())})
    .then(console.log)
    .catch(console.log)
}

module.exports = logger