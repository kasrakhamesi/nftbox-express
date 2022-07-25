'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class listings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  listings.init(
    {
      collectionId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.STRING,
        allowNull: true
      },
      token_id: {
        type: DataTypes.STRING,
        allowNull: true
      },
      is_delist: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      opensea_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      timestamp: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'listings'
    }
  )
  return listings
}
