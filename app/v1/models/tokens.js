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
            token_traits: {
                type: DataTypes.JSON,
                allowNull: true
            },
            token_rank: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: true
            },
            token_basicscore: {
                type: DataTypes.FLOAT,
                allowNull: true
            },
            token_normscore: {
                type: DataTypes.FLOAT,
                allowNull: true
            },
            token_weightscore: {
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
