'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class admins_permissions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
             admins_permissions.belongsToMany(models.admins_roles, {  through: 'admins_role_perms' , foreignKey : 'permId' })
        }
    };
    admins_permissions.init({
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        perm_description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'admins_permissions',
    });
    return admins_permissions;
};