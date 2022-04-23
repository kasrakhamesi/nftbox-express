'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable('admins', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER.UNSIGNED
                },
                roleId: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    references: { model: 'admins_roles', key: 'id' },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                    allowNull: false
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                email: {
                    type: Sequelize.STRING,
                    unique: {
                        args: true,
                        msg: 'This email is already registered.'
                    },
                    validate: {
                        isEmail: {
                            args: true,
                            msg: 'invalid email'
                        }
                    },
                    allowNull: false
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                last_login: {
                    type: Sequelize.STRING
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
                queryInterface.addIndex('admins', ['email'], { unique: true })
            )
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('admins')
    }
}
