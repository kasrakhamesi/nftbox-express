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
                value: '591572cc-c78d-4a3a-ae00-ae8d53849fb2',
                description: 'API Key for Authentication to ModuleNFT API'
            },
            {
                title: 'GetBlock.io API Key',
                key: 'GetBlockApiKey',
                value: '%',
                description: 'API Key for Authentication to GetBlock API'
            },
            {
                title: 'Tatum API Key',
                key: 'TatumApiKey',
                value: 'a97b84c3-a37b-4c3f-85b7-d8b4f69efaa3',
                description:
                    'API Key for Authentication to Tatum.io for get NFTs TokensId'
            },
            {
                title: 'Alchemy API Key',
                key: 'AlchemyApiKey',
                value: 'c8XCRD_56zo2QvYijbbPfaw6AgZ9X-e0',
                description:
                    'API Key for Authentication to Alchemy for get NFTs TokensId'
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
        await queryInterface.bulkDelete('configurations', {
            key: 'TatumApiKey'
        })
    }
}
