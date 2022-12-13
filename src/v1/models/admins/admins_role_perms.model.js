'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class admins_role_perm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  admins_role_perm.init(
    {
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      permId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'admins_role_perm'
    }
  )
  return admins_role_perm
}
