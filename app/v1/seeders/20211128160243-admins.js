'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert('admins', [{
            roleId: 1,
            name: 'admin',
            email: 'admin@admin.com',
            password: 'admin',
            last_login: '',
            activated: true,
        }])
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('admins', {
            roleId: 1,
            name: 'admin',
            email: 'admin@admin.com',
            password: 'admin',
            last_login: '',
            activated: true,
        })
    }
};