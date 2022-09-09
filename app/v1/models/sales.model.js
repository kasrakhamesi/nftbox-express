'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class sales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sales.init(
    {
      collectionId: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      tokenId: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      price: {
        type: DataTypes.STRING,
        allowNull: true
      },
      amount: {
        type: DataTypes.STRING,
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
        type: DataTypes.INTEGER,
        allowNull: true
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      url_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      tx_hash: {
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
      modelName: 'sales'
    }
  )
  return sales
}