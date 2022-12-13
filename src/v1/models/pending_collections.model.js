'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class pending_collections extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pending_collections.init(
    {
      slug: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contract_address: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'pending_collections'
    }
  )
  return pending_collections
}
