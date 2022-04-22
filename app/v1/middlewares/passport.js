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
        (jwtPayLoad,done) => {
            return Model.models.admins.findAll({
                    where: {
                        id: jwtPayLoad.id
                    },
                    include: {  
                        model: Model.models.admins_roles, as : 'role',
                        include : {
                            model : Model.models.admins_permissions , as : 'permissions',
                            through : {
                            attributes : {
                                exclude : ['createdAt','updatedAt','permId','roleId']
                              }
                            }
                       }
                   }
                })
                .then(admins => {
                    console.log(admins)
                    const adminsInfo = (admins).map(item => {
                        return {
                            id: item.id,
                            role: item.role,
                            name: item.name,
                            email: item.email,
                            password: item.password,
                            last_login: item.last_login,
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