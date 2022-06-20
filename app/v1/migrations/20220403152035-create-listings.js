'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable('listings', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.BIGINT.UNSIGNED
                },
                collectionId: {
                    type: Sequelize.BIGINT.UNSIGNED,
                    references: { model: 'collections', key: 'id' },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                    allowNull: false
                },
                price: {
                    type: Sequelize.STRING,
                    allowNull: true
                },

                token_rank: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: true
                },
                token_id: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: true
                },
                image_url: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                opensea_url: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                timestamp: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                createdAt: {
                    allowNull: true,
                    type: 'TIMESTAMP',
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
                },
                updatedAt: {
                    allowNull: true,
                    type: 'TIMESTAMP',
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
                }
            })
            .then(() =>
                queryInterface.addIndex('listings', ['token_id'], {
                    unique: true
                })
            )
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('listings')
    }
}
