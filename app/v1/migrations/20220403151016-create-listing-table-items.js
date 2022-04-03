'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('listing_table_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      collection_image: {
        type: Sequelize.STRING,
        allowNull : true
      },
      collection_name : {
        type: Sequelize.STRING,
        allowNull : false
      },
      quantity: {
        type: Sequelize.STRING,
        allowNull : true,
      },
      presale: {
        type: Sequelize.STRING,
        allowNull : true,
      },
      publicsale:{
        type: Sequelize.STRING,
        allowNull : true,
      },
      maxmint:{
        type: Sequelize.STRING,
        allowNull : true,
      },
      presalemint:{
        type: Sequelize.STRING,
        allowNull : true,
      },
      publicsale_timestamp:{
        type: Sequelize.STRING,
        allowNull : true,
      },
      presalemint_timestamp:{
        type: Sequelize.STRING,
        allowNull : true,
      },
      discord_link : {
        type : Sequelize.STRING,
        allowNull : true
      },
      discord_member : {
        type : Sequelize.STRING,
        allowNull : true
      },
      twitter_link : {
        type : Sequelize.STRING,
        allowNull : true
      },
      twitter_member : {
        type : Sequelize.STRING,
        allowNull : true
      },
      opensea_link : {
        type : Sequelize.STRING,
        allowNull : true
      },
      os_royalty : {
        type : Sequelize.STRING,
        allowNull : false
      },
      listing_fee : {
        type : Sequelize.STRING,
        allowNull : true
      },
      floor : {
        type : Sequelize.STRING,
        allowNull : true
      },
      mint_price : {
        type : Sequelize.STRING,
        allowNull : false
      },
      nft_royalty : {
        type : Sequelize.STRING,
        allowNull : true
      },
      hidden: {
        type: Sequelize.BOOLEAN,
        defaultValue : false,
      },
      sortorder: {
        type: Sequelize.INTEGER,
        defaultValue : 1
      },
      access_key: {
        type: Sequelize.STRING,
        allowNull : true
      },
      enable_access_key: {
        type: Sequelize.BOOLEAN,
        defaultValue : false,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('listing_table_items');
  }
};