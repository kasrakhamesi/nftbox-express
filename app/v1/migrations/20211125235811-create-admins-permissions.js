'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('admins_permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false
      },
      perm_description: {
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
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('admins_permissions')
  }
}
