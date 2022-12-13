'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class upcoming_categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  upcoming_categories.init(
    {
      upcomingId: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'upcoming_categories'
    }
  )
  return upcoming_categories
}
