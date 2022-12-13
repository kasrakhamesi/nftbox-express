'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert('admins_roles', [
            {
                role_name: 'Founder'
            },
            {
                role_name: 'Admin'
            }
        ])
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('admins_roles', {
            role_name: 'Founder'
        })
        await queryInterface.bulkDelete('admins_roles', {
            role_name: 'Admin'
        })
    }
}
