'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class whitelist_addresses extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    whitelist_addresses.init(
        {
            address: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'whitelist_addresses'
        }
    )
    return whitelist_addresses
}
