'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('upcoming_table', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      contract_address: {
        type: Sequelize.STRING,
        allowNull : false
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
      presale_price: {
        type: Sequelize.STRING,
        allowNull : true,
      },
      publicsale_price:{
        type: Sequelize.STRING,
        allowNull : true,
      },
      max_mint:{
        type: Sequelize.STRING,
        allowNull : true,
      },
      publicsale_mint_timestamp:{
        type: Sequelize.STRING,
        allowNull : true,
      },
      presale_mint_timestamp:{
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
      error_log : {
        type: Sequelize.STRING,
        allowNull : true,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('upcoming_table');
  }
};