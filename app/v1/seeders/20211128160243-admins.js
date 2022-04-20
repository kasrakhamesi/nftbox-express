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
            name: 'god',
            email: 'god@god.com',
            password: 'god',
            last_login: ''
        },{
            roleId: 2,
            name: 'admin',
            email: 'admin@admin.com',
            password: 'admin',
            last_login: ''
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
            name: 'god',
            email: 'god@god.com',
        })
        await queryInterface.bulkDelete('admins', {
            roleId: 2,
            name: 'admin',
            email: 'admin@admin.com',
        })
    }
};