'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class admins_roles extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            admins_roles.belongsToMany(models.admins_permissions, {  through: 'admins_role_perms' , as : 'permissions' , foreignKey : 'roleId' })
        }
    };
    admins_roles.init({
        role_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'admins_roles',
    });
    return admins_roles;
};