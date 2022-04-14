const Model = require('../../models').sequelize
const { restful } = require('../../libs')
const { authurize } = require('../../middlewares')
const api = new restful(Model.models.admins,['admnis'])

module.exports = {
    login : async(req,res) => {
        const { email, password } = req.body

        if (!email && !password) return res.status(400).send({message : "invalid inputs"})

            const condition = {
                email : email,
                password : password
            }

            const attributes = { exclude: ['roleId'] }
            
            let resLogin = (await api.Get({ where : condition, include : { model: Model.models.admins_roles, as: 'role' } , attributes : attributes , checkJwt : false , checkRole : false , req : req, res: res})).content

            if (resLogin?.count === 0) return res.status(400).send({ message : "invalid username or password" })

            const jwtToken = authurize.jwt(resLogin?.rows["0"])

            resLogin = resLogin.rows

            const account = (resLogin).map(item => {
                return {
                    id: item.id,
                    role: item.role,
                    name: item.name,
                    email: item.email,
                    password: item.password,
                    last_login: item.last_login,
                    activated: item.activated,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                    token : {
                        access_token: jwtToken,
                        expire: authurize.managerDecodeJwt(jwtToken).exp
                    }
                }
            })
            
        res.status(200).send(account)
            
    },
    dashboard : async(req,res) => {
        try {

            if (req.isAuthenticated(req, res))
                return res.status(200).send(req.user)
    
            res.redirect('/v1/unauthurized')
        } catch {
            res.status(500).send({ message: e.message })
        }
    }
}