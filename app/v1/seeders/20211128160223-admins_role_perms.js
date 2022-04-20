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

        await queryInterface.bulkInsert('admins_role_perms', [{
            roleId: 1,
            permId: 1
        },{
            roleId: 2,
            permId: 2
        },{
            roleId: 2,
            permId: 6
        }])
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('admins_role_perms', {
            roleId: 1,
            permId: 1
        })
        await queryInterface.bulkDelete('admins_role_perms', {
            roleId: 2,
            permId: 2
        })
        await queryInterface.bulkDelete('admins_role_perms', {
            roleId: 2,
            permId: 6
        })
    }
};