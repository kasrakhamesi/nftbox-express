'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('whitelist_addresses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER.UNSIGNED
            },
            public_address: {
                type: Sequelize.STRING,
                allowNull: false
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
        }).then(() => queryInterface.addIndex('whitelist_addresses', ['public_address'], { unique: true }));
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('whitelist_addresses');
    }
};