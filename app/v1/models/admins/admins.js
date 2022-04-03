'use strict';
const {
    Model
} = require('sequelize');
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
        }
    };
    admins.init({
        roleId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'This username is already registered.'
            },
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_login: {
            type: DataTypes.STRING
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
                    msg: "invalid email"
                }
            },
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'This phone is already registered.'
            },
            validate: {
                is: /^(\+98|0098|98|0)?9\d{9}$/
            },
            allowNull: false
        },
        activated: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        sequelize,
        modelName: 'admins',
    });
    return admins;
};