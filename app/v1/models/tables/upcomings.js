"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class upcomings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      upcomings.belongsToMany(models.categories, {
        through: "upcoming_categories",
        as: "categories",
        foreignKey: "upcomingId",
      });
    }
  }
  upcomings.init(
    {
      contract_address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      collection_background_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      collection_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      collection_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      presale_price: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      publicsale_price: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      max_mint: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      publicsale_mint_timestamp: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      presale_mint_timestamp: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      reveal_timestamp: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      discord_link: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      discord_member: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      twitter_link: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      twitter_member: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      opensea_link: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      website_link: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      os_royalty: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      listing_fee: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      floor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nft_royalty: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_upcoming: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true,
      },
      is_automatic_check: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true,
      },
      hidden: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      sortorder: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      access_key: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      enable_access_key: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      twitter_description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      admin_description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "upcomings",
    }
  );
  return upcomings;
};
