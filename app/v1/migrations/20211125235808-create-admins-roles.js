'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('admins_roles', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER.UNSIGNED
            },
            role_name: {
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
        }).then(() => queryInterface.addIndex('admins_roles', ['role_name'], { unique: true }))
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('admins_roles');
    }
};