'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable('tokens', {
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
                token_id: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: false
                },
                token_traits: {
                    type: Sequelize.JSON,
                    allowNull: true
                },
                token_rank: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: true
                },
                token_basicscore: {
                    type: Sequelize.FLOAT,
                    allowNull: true
                },
                token_normscore: {
                    type: Sequelize.FLOAT,
                    allowNull: true
                },
                token_weightscore: {
                    type: Sequelize.FLOAT,
                    allowNull: true
                },
                token_image: {
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
                queryInterface.addIndex(
                    'tokens',
                    ['collectionId', 'token_id'],
                    {
                        unique: true
                    }
                )
            )
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('tokens')
    }
}
