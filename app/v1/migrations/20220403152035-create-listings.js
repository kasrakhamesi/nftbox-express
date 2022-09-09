'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable('listings', {
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
        tokenId: {
          type: Sequelize.BIGINT,
          references: { model: 'tokens', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false
        },
        price: {
          type: Sequelize.STRING,
          allowNull: true
        },
        market: {
          type: Sequelize.STRING,
          allowNull: true
        },
        token_id: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        image_url: {
          type: Sequelize.STRING,
          allowNull: true
        },
        allow_buy: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false
        },
        url: {
          type: Sequelize.STRING,
          allowNull: true
        },
        timestamp: {
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
        queryInterface.addIndex(
          'listings',
          ['token_id', 'collectionId', 'timestamp', 'allow_buy'],
          {
            unique: true
          }
        )
      )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('listings')
  }
}
