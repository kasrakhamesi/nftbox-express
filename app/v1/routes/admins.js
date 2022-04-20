const express = require('express')
const router = express.Router()
const { admins } = require('../controllers')
const { passport } = require('../middlewares')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

const adminsPassport = passport.adminsPassport.authenticate('jwt', { session: false ,failureRedirect : "/v1/unauthurized" })

//Admin Login && Register && Dashboard Routes
router.put('/admins/change-password',adminsPassport, admins.authentications.changePassword)
router.post('/admins/login', admins.authentications.login)
router.post('/admins', adminsPassport, admins.admins.create)

router.get('/admins/login', adminsPassport, admins.authentications.dashboard)
router.get('/admins/id/:id', adminsPassport, admins.admins.findOne)
router.get('/admins', adminsPassport, admins.admins.findAll)

router.put('/admins/id/:id', adminsPassport, admins.admins.update)
router.delete('/admins/id/:id', adminsPassport, admins.admins.delete)

//Admins managements Routes

router.get('/admins/managements/roles/id/:id', adminsPassport, admins.managements.adminsRoles.findOne)
router.get('/admins/managements/roles', adminsPassport, admins.managements.adminsRoles.findAll)

router.get('/admins/managements/permissions/id/:id', adminsPassport, admins.managements.adminsPermissions.findOne)
router.get('/admins/managements/permissions', adminsPassport, admins.managements.adminsPermissions.findAll)

router.get('/admins/managements/roles-permissions/id/:id', adminsPassport, admins.managements.adminsRolesPermissions.findOne)
router.get('/admins/managements/roles-permissions', adminsPassport, admins.managements.adminsRolesPermissions.findAll)


module.exports = router