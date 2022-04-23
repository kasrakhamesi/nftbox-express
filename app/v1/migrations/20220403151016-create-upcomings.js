'use strict'
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('upcomings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER.UNSIGNED
            },
            contract_address: {
                type: Sequelize.STRING,
                allowNull: true
            },
            collection_background_image: {
                type: Sequelize.STRING,
                allowNull: true
            },
            collection_image: {
                type: Sequelize.STRING,
                allowNull: true
            },
            collection_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            quantity: {
                type: Sequelize.STRING,
                allowNull: true
            },
            presale_price: {
                type: Sequelize.STRING,
                allowNull: true
            },
            publicsale_price: {
                type: Sequelize.STRING,
                allowNull: true
            },
            max_mint: {
                type: Sequelize.STRING,
                allowNull: true
            },
            publicsale_mint_timestamp: {
                type: Sequelize.STRING,
                allowNull: true
            },
            presale_mint_timestamp: {
                type: Sequelize.STRING,
                allowNull: true
            },
            reveal_timestamp: {
                type: Sequelize.STRING,
                allowNull: true
            },
            discord_link: {
                type: Sequelize.STRING,
                allowNull: true
            },
            discord_member: {
                type: Sequelize.STRING,
                allowNull: true
            },
            twitter_link: {
                type: Sequelize.STRING,
                allowNull: true
            },
            twitter_member: {
                type: Sequelize.STRING,
                allowNull: true
            },
            opensea_link: {
                type: Sequelize.STRING,
                allowNull: true
            },
            website_link: {
                type: Sequelize.STRING,
                allowNull: true
            },
            os_royalty: {
                type: Sequelize.STRING,
                defaultValue: '2.5 %',
                allowNull: true
            },
            listing_fee: {
                type: Sequelize.STRING,
                allowNull: true
            },
            floor: {
                type: Sequelize.STRING,
                allowNull: true
            },
            nft_royalty: {
                type: Sequelize.STRING,
                allowNull: true
            },
            is_upcoming: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
                allowNull: true
            },
            is_automatic_check: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
                allowNull: true
            },
            hidden: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            sortorder: {
                type: Sequelize.INTEGER,
                defaultValue: 1
            },
            access_key: {
                type: Sequelize.STRING,
                allowNull: true
            },
            enable_access_key: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            twitter_description: {
                type: Sequelize.STRING,
                allowNull: true
            },
            admin_description: {
                type: Sequelize.STRING,
                allowNull: true
            },
            error_log: {
                type: Sequelize.STRING,
                allowNull: true
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
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('upcomings')
    }
}
