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
        await queryInterface.bulkInsert('admins_permissions', [{
            role: 'GOD',
            perm_description: 'Full Access',
        },  {
            role: 'listing_table',
            perm_description: 'Admins Roles',
        },{
            role: 'admins',
            perm_description: 'Admins Managment'
        }, {
            role: 'admins_roles',
            perm_description: 'Admins Roles',
        }])
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */

        await queryInterface.bulkDelete('admins_permissions', {
            role: 'GOD'
        })
        await queryInterface.bulkDelete('admins_permissions', {
            role: 'listing_table'
        })
        await queryInterface.bulkDelete('admins_permissions', {
            role: 'admins'
        })
        await queryInterface.bulkDelete('admins_permissions', {
            role: 'admins_roles'
        })
    
    }
};