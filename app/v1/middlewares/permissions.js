const Model = require('../models').sequelize
const adminsPermissions = {}

adminsPermissions.check = async(roleId, permissionName) => {
    try {

        const getPermissionsFromRoleId = await Model.models.admins_role_perm.findAll({
            where: {
                roleId: roleId
            }
        })

        const getPermissions = await Model.models.admins_permissions.findAll()

        let targetPermissions = []

        for (let k = 0; k < getPermissionsFromRoleId.length; k++) {

            let permCheck = await (getPermissions)
                .filter(item => item.id == getPermissionsFromRoleId[k].permId)
                .map(item => {
                    return item
                })

            targetPermissions.push({
                id: permCheck[k].id,
                role: permCheck[k].role,
                perm_description: permCheck[k].perm_description
            })
        }

        for (let i = 0; i < targetPermissions.length; i++) {
            for (let m = 0; m < permissionName.length; m++) {
                if (permissionName[m] == targetPermissions[i].role || targetPermissions[i].role == 'GOD')
                    return true
            }
        }

        return { status: 403, content: { message : "You Don't have permisssion for this endpoint"} }

    } catch {
        return { status: 403, content: { message : "You Don't have permisssion for this endpoint"} }
    }
}

module.exports = adminsPermissions