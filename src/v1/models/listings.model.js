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
      listings.belongsTo(models.tokens, {
        foreignKey: 'tokenId',
        as: 'meta'
      })
    }
  }
  listings.init(
    {
      collectionId: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      tokenId: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      price: {
        type: DataTypes.STRING,
        allowNull: true
      },
      market: {
        type: DataTypes.STRING,
        allowNull: true
      },
      token_id: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      image_url: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      allow_buy: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      url: {
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
