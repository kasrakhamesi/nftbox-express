'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tokens.init(
    {
      collectionId: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      token_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      token_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      token_url: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      token_description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      string_traits: {
        type: DataTypes.JSON,
        allowNull: true
      },
      numeric_traits: {
        type: DataTypes.JSON,
        allowNull: true
      },
      basic_rank: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      normal_rank: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      weight_rank: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      basic_score: {
        type: DataTypes.STRING,
        allowNull: true
      },
      normal_score: {
        type: DataTypes.STRING,
        allowNull: true
      },
      weight_score: {
        type: DataTypes.STRING,
        allowNull: true
      },
      token_image: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      weight_property: { type: DataTypes.STRING, allowNull: true },
      normal_property: { type: DataTypes.STRING, allowNull: true },
      basic_property: { type: DataTypes.STRING, allowNull: true }
    },
    {
      sequelize,
      modelName: 'tokens'
    }
  )
  return tokens
}
