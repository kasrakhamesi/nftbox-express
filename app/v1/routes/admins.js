const express = require('express')
const router = express.Router()
const { admins } = require('../controllers')
const { passport } = require('../middlewares')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

const adminsPassport = passport.adminsPassport.authenticate('jwt', { session: false ,failureRedirect : "/v1/unauthurized" })

//Admin Login && Register && Dashboard Routes
router.post('/admins/login', admins.authentications.login)
router.post('/admins', adminsPassport, admins.admins.create)
router.get('/admins', adminsPassport, admins.authentications.dashboard)
router.put('/admins/id/:id', adminsPassport, admins.admins.update)
router.delete('/admins/id/:id', adminsPassport, admins.admins.delete)

//Admins Managments Routes
router.get('/admins/managments/admins/id/:id', adminsPassport, admins.admins.findOne)
router.get('/admins/managments/admins', adminsPassport, admins.admins.findAll)

router.get('/admins/managments/roles/id/:id', adminsPassport, admins.managments.adminsRoles.findOne)
router.get('/admins/managments/roles', adminsPassport, admins.managments.adminsRoles.findAll)

router.get('/admins/managments/permissions/id/:id', adminsPassport, admins.managments.adminsPermissions.findOne)
router.get('/admins/managments/permissions', adminsPassport, admins.managments.adminsPermissions.findAll)

router.get('/admins/managments/roles-permissions/id/:id', adminsPassport, admins.managments.adminsRolesPermissions.findOne)
router.get('/admins/managments/roles-permissions', adminsPassport, admins.managments.adminsRolesPermissions.findAll)


module.exports = router