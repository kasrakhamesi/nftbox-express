'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class collections extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  collections.init(
    {
      contract_address: {
        type: DataTypes.STRING,
        allowNull: true
      },
      collection_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      collection_slug: {
        type: DataTypes.STRING,
        allowNull: true
      },

      revealed_percentage: {
        type: DataTypes.FLOAT,
        allowNull: true
      },

      collection_creation_date: {
        type: DataTypes.STRING,
        allowNull: true
      },

      total_supply: {
        type: DataTypes.STRING,
        allowNull: false
      },

      owners_count: {
        type: DataTypes.STRING,
        allowNull: true
      },

      percent_owner: {
        type: DataTypes.STRING,
        allowNull: true
      },

      nft_royalty: {
        type: DataTypes.STRING,
        allowNull: true
      },

      sales_volume: {
        type: DataTypes.STRING,
        allowNull: true
      },

      volume_traded: {
        type: DataTypes.STRING,
        allowNull: true
      },

      floor_price: {
        type: DataTypes.STRING,
        allowNull: true
      },

      average_price: {
        type: DataTypes.STRING,
        allowNull: true
      },

      one_minute_floor_price: {
        type: DataTypes.STRING,
        allowNull: true
      },

      five_minute_floor_price: {
        type: DataTypes.STRING,
        allowNull: true
      },

      fifteen_minute_floor_price: {
        type: DataTypes.STRING,
        allowNull: true
      },
      one_hour_floor_price: {
        type: DataTypes.STRING,
        allowNull: true
      },

      six_hour_floor_price: {
        type: DataTypes.STRING,
        allowNull: true
      },

      twelve_hour_floor_price: {
        type: DataTypes.STRING,
        allowNull: true
      },
      one_day_floor_price: {
        type: DataTypes.STRING,
        allowNull: true
      },

      seven_day_floor_price: {
        type: DataTypes.STRING,
        allowNull: true
      },

      one_minute_market_cap: {
        type: DataTypes.STRING,
        allowNull: true
      },

      five_minute_market_cap: {
        type: DataTypes.STRING,
        allowNull: true
      },

      fifteen_minute_market_cap: {
        type: DataTypes.STRING,
        allowNull: true
      },

      one_hour_market_cap: {
        type: DataTypes.STRING,
        allowNull: true
      },

      six_hour_market_cap: {
        type: DataTypes.STRING,
        allowNull: true
      },
      twelve_hour_market_cap: {
        type: DataTypes.STRING,
        allowNull: true
      },

      one_day_market_cap: {
        type: DataTypes.STRING,
        allowNull: true
      },

      seven_day_market_cap: {
        type: DataTypes.STRING,
        allowNull: true
      },

      one_minute_sales: {
        type: DataTypes.STRING,
        allowNull: true
      },

      five_minute_sales: {
        type: DataTypes.STRING,
        allowNull: true
      },

      fifteen_minute_sales: {
        type: DataTypes.STRING,
        allowNull: true
      },

      one_hour_sales: {
        type: DataTypes.STRING,
        allowNull: true
      },
      six_hour_sales: {
        type: DataTypes.STRING,
        allowNull: true
      },

      twelve_hour_sales: {
        type: DataTypes.STRING,
        allowNull: true
      },

      one_day_sales: {
        type: DataTypes.STRING,
        allowNull: true
      },

      seven_day_sales: {
        type: DataTypes.STRING,
        allowNull: true
      },

      one_minute_listings: {
        type: DataTypes.STRING,
        allowNull: true
      },

      five_minute_listings: {
        type: DataTypes.STRING,
        allowNull: true
      },

      fifteen_minute_listings: {
        type: DataTypes.STRING,
        allowNull: true
      },

      one_hour_listings: {
        type: DataTypes.STRING,
        allowNull: true
      },

      six_hour_listings: {
        type: DataTypes.STRING,
        allowNull: true
      },

      twelve_hour_listings: {
        type: DataTypes.STRING,
        allowNull: true
      },

      one_day_listings: {
        type: DataTypes.STRING,
        allowNull: true
      },

      seven_day_listings: {
        type: DataTypes.STRING,
        allowNull: true
      },

      one_minute_volume: {
        type: DataTypes.STRING,
        allowNull: true
      },

      five_minute_volume: {
        type: DataTypes.STRING,
        allowNull: true
      },

      fifteen_minute_volume: {
        type: DataTypes.STRING,
        allowNull: true
      },

      one_hour_volume: {
        type: DataTypes.STRING,
        allowNull: true
      },

      six_hour_volume: {
        type: DataTypes.STRING,
        allowNull: true
      },

      twelve_hour_volume: {
        type: DataTypes.STRING,
        allowNull: true
      },

      one_day_volume: {
        type: DataTypes.STRING,
        allowNull: true
      },

      seven_day_volume: {
        type: DataTypes.STRING,
        allowNull: true
      },

      banner_image_url: {
        type: DataTypes.STRING,
        allowNull: true
      },

      image_url: {
        type: DataTypes.STRING,
        allowNull: true
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },

      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
      },

      twitter_url: {
        type: DataTypes.STRING,
        allowNull: true
      },

      discord_url: {
        type: DataTypes.STRING,
        allowNull: true
      },

      website_url: {
        type: DataTypes.STRING,
        allowNull: true
      },

      telegram_url: {
        type: DataTypes.STRING,
        allowNull: true
      },

      instagram_url: {
        type: DataTypes.STRING,
        allowNull: true
      },

      numeric_traits: {
        type: DataTypes.JSON,
        allowNull: true
      },

      string_traits: {
        type: DataTypes.JSON,
        allowNull: true
      },

      checked_tarits: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
      },

      opensea_url: {
        type: DataTypes.STRING,
        allowNull: true
      },

      x2y2_url: {
        type: DataTypes.STRING,
        allowNull: true
      },

      looksrare_url: {
        type: DataTypes.STRING,
        allowNull: true
      },

      collection_type: {
        type: DataTypes.ENUM('erc1155', 'erc721'),
        defaultValue: 'erc721'
      },

      is_trending: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'collections'
    }
  )
  return collections
}
