'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class listing_table_items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  listing_table_items.init({
    collection_image: {
      type: DataTypes.STRING,
      allowNull : true
    },
    collection_name : {
      type: DataTypes.STRING,
      allowNull : false
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull : true,
    },
    presale: {
      type: DataTypes.STRING,
      allowNull : true,
    },
    publicsale:{
      type: DataTypes.STRING,
      allowNull : true,
    },
    max_mint:{
      type: DataTypes.STRING,
      allowNull : true,
    },
    presale_mint:{
      type: DataTypes.STRING,
      allowNull : true,
    },
    publicsale:{
      type: DataTypes.STRING,
      allowNull : true,
    },
    presale_mint:{
      type: DataTypes.STRING,
      allowNull : true,
    },
    discord_link : {
      type : DataTypes.STRING,
      allowNull : true
    },
    discord_member : {
      type : DataTypes.STRING,
      allowNull : true
    },
    twitter_link : {
      type : DataTypes.STRING,
      allowNull : true
    },
    twitter_member : {
      type : DataTypes.STRING,
      allowNull : true
    },
    opensea_link : {
      type : DataTypes.STRING,
      allowNull : true
    },
    os_royalty : {
      type : DataTypes.STRING,
      allowNull : false
    },
    listing_fee : {
      type : DataTypes.STRING,
      allowNull : true
    },
    floor : {
      type : DataTypes.STRING,
      allowNull : true
    },
    mint_price : {
      type : DataTypes.STRING,
      allowNull : false
    },
    nft_royalty : {
      type : DataTypes.STRING,
      allowNull : true
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      defaultValue : false,
    },
    sortorder: {
      type: DataTypes.INTEGER,
      defaultValue : 1
    },
    access_key: {
      type: DataTypes.STRING,
      allowNull : true
    },
    enable_access_key: {
      type: DataTypes.BOOLEAN,
      defaultValue : false,
    },
  }, {
    sequelize,
    modelName: 'listing_table_items',
  });
  return listing_table_items;
};