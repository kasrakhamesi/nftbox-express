'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class configurations extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    configurations.init(
        {
            title: DataTypes.STRING,
            key: DataTypes.STRING,
            value: DataTypes.STRING,
            description: DataTypes.STRING,
            is_global: DataTypes.BOOLEAN
        },
        {
            sequelize,
            modelName: 'configurations'
        }
    )
    return configurations
}
