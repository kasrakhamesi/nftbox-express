'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class orders extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    orders.init(
        {
            collectionId: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: false
            },
            price: {
                type: DataTypes.STRING,
                allowNull: true
            },

            token_rank: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: true
            },
            token_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: true
            },
            image_url: {
                type: DataTypes.STRING,
                allowNull: true
            },
            opensea_url: {
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
            modelName: 'orders'
        }
    )
    return orders
}
