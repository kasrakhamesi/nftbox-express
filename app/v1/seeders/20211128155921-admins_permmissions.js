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
        await queryInterface.bulkInsert('admins_permissions', [
            {
                role: 'GOD',
                perm_description: 'Full Access'
            },
            {
                role: 'upcoming_table',
                perm_description: 'Upcoming Tables Access'
            },
            {
                role: 'admins',
                perm_description: 'Admins Managment'
            },
            {
                role: 'admins_roles',
                perm_description: 'Admins Roles'
            },
            {
                role: 'activitylogs',
                perm_description: 'Activity Logs'
            },
            {
                role: 'categories',
                perm_description: 'Categories'
            },
            {
                role: 'whitelist_addresses',
                perm_description: 'WhiteList for Addresses Can Use App'
            },
            {
                role: 'configurations',
                perm_description: 'configurations setting'
            },
            {
                role: 'collections_traits',
                perm_description: 'Collection Traits Access'
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

        await queryInterface.bulkDelete('admins_permissions', {
            role: 'GOD'
        })
        await queryInterface.bulkDelete('admins_permissions', {
            role: 'upcoming_table'
        })
        await queryInterface.bulkDelete('admins_permissions', {
            role: 'admins'
        })
        await queryInterface.bulkDelete('admins_permissions', {
            role: 'admins_roles'
        })
        await queryInterface.bulkDelete('admins_permissions', {
            role: 'activitylogs'
        })
        await queryInterface.bulkDelete('admins_permissions', {
            role: 'categories'
        })
        await queryInterface.bulkDelete('admins_permissions', {
            role: 'whitelist_addresses'
        })
        await queryInterface.bulkDelete('admins_permissions', {
            role: 'configurations'
        })
        await queryInterface.bulkDelete('admins_permissions', {
            role: 'collections_traits'
        })
    }
}
