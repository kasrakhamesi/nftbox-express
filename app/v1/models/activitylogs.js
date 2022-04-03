'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class activitylogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  activitylogs.init({
    adminId: DataTypes.STRING,
    description: DataTypes.STRING,
    ip: DataTypes.STRING,
    created_date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'activitylogs',
  });
  return activitylogs;
};