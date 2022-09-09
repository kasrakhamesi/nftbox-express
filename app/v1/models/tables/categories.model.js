'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      categories.belongsToMany(models.upcomings, { through: 'upcoming_categories' , as : 'upcomings', foreignKey : 'categoryId'})
    }
  };
  categories.init({
    title: {
       type : DataTypes.STRING,
       allowNull : false
    },
    color: {
      type : DataTypes.STRING,
      allowNull : false
    },
    tooltip: {
      type : DataTypes.STRING,
      allowNull : false
    },
    display_name: {
      type : DataTypes.STRING,
      allowNull : true
    }
  }, {
    sequelize,
    modelName: 'categories',
  });
  return categories;
};