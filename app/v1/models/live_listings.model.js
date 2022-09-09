'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class live_listings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  live_listings.init(
    {
      collectionId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      expire: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'live_listings'
    }
  )
  return live_listings
}
