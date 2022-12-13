'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class live_collections extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  live_collections.init(
    {
      collectionId: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      expire: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'live_collections'
    }
  )
  return live_collections
}
