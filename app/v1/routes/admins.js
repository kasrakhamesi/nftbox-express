const express = require('express')
const router = express.Router()
const { admins } = require('../controllers')
const { passport } = require('../middlewares')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

const adminsPassport = passport.adminsPassport.authenticate('jwt', { session: false ,failureRedirect : "/v1/unauthurized" })

//Admin Login && Register && Dashboard Routes
router.post('/admins/login', admins.admins.login)
router.post('/admins/register', adminsPassport, admins.admins.register)
router.get('/admins', adminsPassport, admins.admins.dashboard)
router.put('/admins/id/:id', adminsPassport, admins.admins.edit)

//Admins Managments Routes
router.all('/admins/managments/admins/:id', adminsPassport, admins.managments.admins)
router.all('/admins/managments/admins', adminsPassport, admins.managments.admins)
router.all('/admins/managments/roles/id/:id', adminsPassport, admins.managments.adminsRoles)
router.all('/admins/managments/roles', adminsPassport, admins.managments.adminsRoles)
router.all('/admins/managments/permissions/id/:id', adminsPassport, admins.managments.adminsPermissions)
router.all('/admins/managments/permissions', adminsPassport, admins.managments.adminsPermissions)
router.all('/admins/managments/roles_permissions/id/:id', adminsPassport, admins.managments.adminsRolesPermissions)
router.all('/admins/managments/roles_permissions', adminsPassport, admins.managments.adminsRolesPermissions)


module.exports = router