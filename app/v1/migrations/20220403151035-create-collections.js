'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable('collections', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT.UNSIGNED
        },
        contract_address: {
          type: Sequelize.STRING,
          allowNull: true
        },
        collection_name: {
          type: Sequelize.STRING,
          allowNull: true
        },
        collection_slug: {
          type: Sequelize.STRING,
          allowNull: true
        },

        collection_creation_date: {
          type: Sequelize.STRING,
          allowNull: true
        },

        total_supply: {
          type: Sequelize.STRING,
          allowNull: false
        },

        owners_count: {
          type: Sequelize.STRING,
          allowNull: true
        },

        percent_owner: {
          type: Sequelize.STRING,
          allowNull: true
        },

        nft_royalty: {
          type: Sequelize.STRING,
          allowNull: true
        },

        sales_volume: {
          type: Sequelize.STRING,
          allowNull: true
        },

        volume_traded: {
          type: Sequelize.STRING,
          allowNull: true
        },

        floor_price: {
          type: Sequelize.STRING,
          allowNull: true
        },

        average_price: {
          type: Sequelize.STRING,
          allowNull: true
        },

        one_minute_floor_price: {
          type: Sequelize.STRING,
          allowNull: true
        },

        five_minute_floor_price: {
          type: Sequelize.STRING,
          allowNull: true
        },

        fifteen_minute_floor_price: {
          type: Sequelize.STRING,
          allowNull: true
        },
        one_hour_floor_price: {
          type: Sequelize.STRING,
          allowNull: true
        },

        six_hour_floor_price: {
          type: Sequelize.STRING,
          allowNull: true
        },

        twelve_hour_floor_price: {
          type: Sequelize.STRING,
          allowNull: true
        },
        one_day_floor_price: {
          type: Sequelize.STRING,
          allowNull: true
        },

        seven_day_floor_price: {
          type: Sequelize.STRING,
          allowNull: true
        },

        one_minute_market_cap: {
          type: Sequelize.STRING,
          allowNull: true
        },

        five_minute_market_cap: {
          type: Sequelize.STRING,
          allowNull: true
        },

        fifteen_minute_market_cap: {
          type: Sequelize.STRING,
          allowNull: true
        },

        one_hour_market_cap: {
          type: Sequelize.STRING,
          allowNull: true
        },

        six_hour_market_cap: {
          type: Sequelize.STRING,
          allowNull: true
        },
        twelve_hour_market_cap: {
          type: Sequelize.STRING,
          allowNull: true
        },

        one_day_market_cap: {
          type: Sequelize.STRING,
          allowNull: true
        },

        seven_day_market_cap: {
          type: Sequelize.STRING,
          allowNull: true
        },

        one_minute_sales: {
          type: Sequelize.STRING,
          allowNull: true
        },

        five_minute_sales: {
          type: Sequelize.STRING,
          allowNull: true
        },

        fifteen_minute_sales: {
          type: Sequelize.STRING,
          allowNull: true
        },

        one_hour_sales: {
          type: Sequelize.STRING,
          allowNull: true
        },
        six_hour_sales: {
          type: Sequelize.STRING,
          allowNull: true
        },

        twelve_hour_sales: {
          type: Sequelize.STRING,
          allowNull: true
        },

        one_day_sales: {
          type: Sequelize.STRING,
          allowNull: true
        },

        seven_day_sales: {
          type: Sequelize.STRING,
          allowNull: true
        },

        one_minute_listings: {
          type: Sequelize.STRING,
          allowNull: true
        },

        five_minute_listings: {
          type: Sequelize.STRING,
          allowNull: true
        },

        fifteen_minute_listings: {
          type: Sequelize.STRING,
          allowNull: true
        },

        one_hour_listings: {
          type: Sequelize.STRING,
          allowNull: true
        },

        six_hour_listings: {
          type: Sequelize.STRING,
          allowNull: true
        },

        twelve_hour_listings: {
          type: Sequelize.STRING,
          allowNull: true
        },

        one_day_listings: {
          type: Sequelize.STRING,
          allowNull: true
        },

        seven_day_listings: {
          type: Sequelize.STRING,
          allowNull: true
        },

        one_minute_volume: {
          type: Sequelize.STRING,
          allowNull: true
        },

        five_minute_volume: {
          type: Sequelize.STRING,
          allowNull: true
        },

        fifteen_minute_volume: {
          type: Sequelize.STRING,
          allowNull: true
        },

        one_hour_volume: {
          type: Sequelize.STRING,
          allowNull: true
        },

        six_hour_volume: {
          type: Sequelize.STRING,
          allowNull: true
        },

        twelve_hour_volume: {
          type: Sequelize.STRING,
          allowNull: true
        },

        one_day_volume: {
          type: Sequelize.STRING,
          allowNull: true
        },

        seven_day_volume: {
          type: Sequelize.STRING,
          allowNull: true
        },

        logo_url: {
          type: Sequelize.STRING,
          allowNull: true
        },

        banner_image_url: {
          type: Sequelize.STRING,
          allowNull: true
        },

        image_url: {
          type: Sequelize.STRING,
          allowNull: true
        },

        description: {
          type: Sequelize.TEXT,
          allowNull: true
        },

        verified: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: true
        },

        twitter_url: {
          type: Sequelize.STRING,
          allowNull: true
        },

        discord_url: {
          type: Sequelize.STRING,
          allowNull: true
        },

        website_url: {
          type: Sequelize.STRING,
          allowNull: true
        },

        telegram_url: {
          type: Sequelize.STRING,
          allowNull: true
        },

        instagram_url: {
          type: Sequelize.STRING,
          allowNull: true
        },

        numeric_traits: {
          type: Sequelize.JSON,
          allowNull: true
        },

        string_traits: {
          type: Sequelize.JSON,
          allowNull: true
        },

        checked_tarits: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: true
        },

        opensea_url: {
          type: Sequelize.STRING,
          allowNull: true
        },

        collection_type: {
          type: Sequelize.ENUM('erc1155', 'erc721'),
          defaultValue: 'erc721'
        },

        is_trending: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
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
      .then(() =>
        queryInterface.addIndex('collections', ['contract_address'], {
          unique: true
        })
      )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('collections')
  }
}
