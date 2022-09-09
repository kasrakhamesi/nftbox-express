'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class percent_collections extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  percent_collections.init(
    {
      collectionId: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      one_minute_floor_price_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      five_minute_floor_price_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      fifteen_minute_floor_price_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },
      one_hour_floor_price_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      six_hour_floor_price_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      twelve_hour_floor_price_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },
      one_day_floor_price_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      seven_day_floor_price_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      one_minute_market_cap_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      five_minute_market_cap_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      fifteen_minute_market_cap_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      one_hour_market_cap_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      six_hour_market_cap_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },
      twelve_hour_market_cap_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      one_day_market_cap_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      seven_day_market_cap_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      one_minute_sales_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      five_minute_sales_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      fifteen_minute_sales_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      one_hour_sales_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },
      six_hour_sales_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      twelve_hour_sales_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      one_day_sales_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      seven_day_sales_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      one_minute_listings_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      five_minute_listings_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      fifteen_minute_listings_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      one_hour_listings_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      six_hour_listings_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      twelve_hour_listings_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      one_day_listings_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      seven_day_listings_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      one_minute_volume_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      five_minute_volume_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      fifteen_minute_volume_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      one_hour_volume_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      six_hour_volume_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      twelve_hour_volume_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      one_day_volume_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      },

      seven_day_volume_change_percent: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'percent_collections'
    }
  )
  return percent_collections
}
