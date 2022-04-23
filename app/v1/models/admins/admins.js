'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class admins extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            admins.belongsTo(models.admins_roles, {
                foreignKey: 'roleId',
                as: 'role'
            })
            admins.hasMany(models.activitylogs, { foreignKey: 'id' })
        }
    }
    admins.init(
        {
            roleId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
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
                type: DataTypes.STRING,
                allowNull: false
            },
            last_login: {
                type: DataTypes.STRING
            }
        },
        {
            sequelize,
            modelName: 'admins'
        }
    )
    return admins
}
