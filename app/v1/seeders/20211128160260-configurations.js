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
        await queryInterface.bulkInsert('configurations', [
            {
                title: 'Twitter Api BearerToken',
                key: 'TwitterApiBearerToken',
                value: 'AAAAAAAAAAAAAAAAAAAAAERkbgEAAAAAwteJU20DinzI5WVRm0ADPuKHFKs%3Df4goyDof9CcXcuptq0xPJgonEFCtqO8epw4FYVANOCEb8CArWW',
                description: 'Bearer Token for Authentication to Twitter API'
            },
            {
                title: 'Twitter Secret Key',
                key: 'TwitterSecretKey',
                value: '%',
                description: 'Secret Key for Authentication to Twitter API'
            },
            {
                title: 'Twitter API Key',
                key: 'TwitterApiKey',
                value: '%',
                description: 'API Key for Authentication to Twitter API'
            },
            {
                title: 'Open Sea API Key',
                key: 'OpenSeaApiKey',
                value: '%',
                description: 'API Key for Authentication to OpenSea API'
            },
            {
                title: 'Module NFT API Key',
                key: 'ModuleNftApiKey',
                value: '%',
                description: 'API Key for Authentication to ModuleNFT API'
            },
            {
                title: 'GetBlock.io API Key',
                key: 'GetBlockApiKey',
                value: '%',
                description: 'API Key for Authentication to GetBlock API'
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
        await queryInterface.bulkDelete('configurations', {
            key: 'TwitterApiBearerToken'
        })
        await queryInterface.bulkDelete('configurations', {
            key: 'TwitterSecretKey'
        })
        await queryInterface.bulkDelete('configurations', {
            key: 'TwitterApiKey'
        })
        await queryInterface.bulkDelete('configurations', {
            key: 'OpenSeaApiKey'
        })
        await queryInterface.bulkDelete('configurations', {
            key: 'ModuleNftApiKey'
        })
        await queryInterface.bulkDelete('configurations', {
            key: 'GetBlockApiKey'
        })
    }
}
