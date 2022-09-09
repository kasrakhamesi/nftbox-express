const { sequelize } = require('../../models')

module.exports.findAll = (req, res) => {
  const include = [
    {
      model: sequelize.models.categories,
      as: 'categories',
      attributes: {
        exclude: ['display_name']
      },
      through: {
        attributes: {
          exclude: ['upcomingId', 'categoryId', 'createdAt', 'updatedAt']
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
  return sequelize.models.upcomings
    .findAll({
      include: include,
      attributes: attributes
    })
    .then((r) => {
      return res.status(200).send({
        statusCode: 200,
        data: r,
        error: null
      })
    })
    .catch((e) => {
      return res.status(400).send({
        statusCode: 400,
        data: null,
        error: e.message
      })
    })
}

module.exports.findOne = async (req, res) => {
  const { id } = req.params

  const include = [
    {
      model: sequelize.models.categories,
      as: 'categories',
      attributes: {
        exclude: ['display_name']
      },
      through: {
        attributes: {
          exclude: ['upcomingId', 'categoryId', 'createdAt', 'updatedAt']
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
  return sequelize.models.upcomings
    .findOne({
      where: {
        id: id
      },
      include: include,
      attributes: attributes
    })
    .then((r) => {
      return res.status(200).send({
        statusCode: 200,
        data: r,
        error: null
      })
    })
    .catch((e) => {
      return res.status(400).send({
        statusCode: 400,
        data: null,
        error: e.message
      })
    })
}
