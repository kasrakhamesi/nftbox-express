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
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      token_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      token_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      token_url: {
        type: DataTypes.STRING,
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
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
      },
      norm_rank: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
      },
      weight_rank: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
      },
      basic_score: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      norm_score: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      weight_score: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      token_image: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'tokens'
    }
  )
  return tokens
}
