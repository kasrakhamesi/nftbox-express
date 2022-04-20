'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('configurations', {
            key: {
                type: Sequelize.STRING,
                allowNull: false
            },
            value: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
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
        }).then(() => queryInterface.addIndex('configurations', ['key'], { unique: true }));
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('configurations');
    }
};