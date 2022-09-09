'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable('percent_collections', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT
        },
        collectionId: {
          type: Sequelize.BIGINT,
          references: { model: 'collections', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false
        },
        one_minute_floor_price_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        five_minute_floor_price_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        fifteen_minute_floor_price_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },
        one_hour_floor_price_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        six_hour_floor_price_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        twelve_hour_floor_price_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },
        one_day_floor_price_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        seven_day_floor_price_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        one_minute_market_cap_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        five_minute_market_cap_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        fifteen_minute_market_cap_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        one_hour_market_cap_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        six_hour_market_cap_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },
        twelve_hour_market_cap_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        one_day_market_cap_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        seven_day_market_cap_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        one_minute_sales_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        five_minute_sales_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        fifteen_minute_sales_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        one_hour_sales_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },
        six_hour_sales_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        twelve_hour_sales_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        one_day_sales_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        seven_day_sales_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        one_minute_listings_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        five_minute_listings_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        fifteen_minute_listings_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        one_hour_listings_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        six_hour_listings_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        twelve_hour_listings_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        one_day_listings_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        seven_day_listings_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        one_minute_volume_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        five_minute_volume_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        fifteen_minute_volume_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        one_hour_volume_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        six_hour_volume_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        twelve_hour_volume_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        one_day_volume_change_percent: {
          type: Sequelize.STRING,
          allowNull: true
        },

        seven_day_volume_change_percent: {
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
      .then(() =>
        queryInterface.addIndex('percent_collections', ['collectionId'], {
          unique: true
        })
      )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('percent_collections')
  }
}
