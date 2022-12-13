'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class floor_prices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  floor_prices.init(
    {
      collectionId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'floor_prices'
    }
  )
  return floor_prices
}
