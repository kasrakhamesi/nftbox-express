'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable('relists', {
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
          allowNull: true
        },
        type: {
          type: Sequelize.ENUM('higher', 'lower'),
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
          type: Sequelize.BIGINT,
          allowNull: true
        },
        image_url: {
          type: Sequelize.STRING,
          allowNull: true
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
          'relists',
          ['token_id', 'collectionId', 'timestamp'],
          {
            unique: true
          }
        )
      )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('relists')
  }
}
