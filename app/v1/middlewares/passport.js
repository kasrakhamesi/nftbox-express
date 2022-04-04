const Passport = require('passport').Passport
const passportJwt = require('passport-jwt')
const Model = require('../models').sequelize
const adminsPassport = new Passport()
const ExtractJwt = passportJwt.ExtractJwt
const StrategyJwt = passportJwt.Strategy

const adminAccess = 'qqqqq'

adminsPassport.use(
    new StrategyJwt({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: adminAccess
        },
        (jwtPayLoad, done) => {
            return Model.models.admins.findAll({
                    where: {
                        id: jwtPayLoad.id
                    },
                    include: { model: Model.models.admins_roles, as: 'role' }
                })
                .then(admins => {
                    const adminsInfo = (admins).map(item => {
                        return {
                            id: item.id,
                            role: {
                                id: item.role.id,
                                role_name: item.role.role_name,
                                color: item.role.color,
                                createdAt: item.role.createdAt,
                                updatedAt: item.role.updatedAt
                            },
                            name: item.name,
                            email: item.email,
                            password: item.password,
                            last_login: item.last_login,
                            activated: item.activated,
                            createdAt: item.createdAt,
                            updatedAt: item.updatedAt,
                        }
                    })
                    return done(null, adminsInfo)
                })
                .catch(err => {
                    return done(err)
                })
        }
    )
)

module.exports = { adminsPassport }