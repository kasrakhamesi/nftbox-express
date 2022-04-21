const Model = require('../../models').sequelize
const { restful } = require('../../libs')
const { authurize } = require('../../middlewares')
const { logger } = require('../../utils')
const api = new restful(Model.models.admins,['admnis'])

module.exports = {
    login : async(req,res) => {
        const { email, password } = req.body

        if (!email && !password) return res.status(400).send({message : "invalid inputs"})

            const condition = {
                email : email,
                password : password
            }
            
            let resLogin = (await api.Get({ where : condition, include : { model: Model.models.admins_roles, as: 'role' } , checkJwt : false , checkRole : false , req : req, res: res})).content

            if (resLogin?.count === 0) return res.status(400).send({ message : "invalid username or password" })

            const jwtToken = authurize.jwt(resLogin?.rows[0])

            resLogin = resLogin.rows

            const account = (resLogin).map(item => {
                return {
                    id: item.id,
                    role: item.role,
                    name: item.name,
                    email: item.email,
                    password: item.password,
                    last_login: item.last_login,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                    token : {
                        access_token: jwtToken,
                        expire: authurize.managerDecodeJwt(jwtToken).exp
                    }
                }
            })

         Model.models.admins.update({last_login : String(Date.now())}, {
            where: {
                id : parseInt(resLogin[0].id)
            }
        }).then(console.log).catch(console.log)

        if (resLogin[0].roleId !== 1) {
            logger(resLogin[0].id,"new login from admin")
        }

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
    },
    changePassword : async(req,res) => {
        try {
            const { new_password } = req.body
            if (req.isAuthenticated(req, res))
                {
                    const adminId = req.user[0].id
                    const resUpdate = await Model.models.admins.update({
                        password : new_password
                    },{
                        where: { id : adminId }
                    })
                    if (resUpdate[0] || resUpdate >= 1) {
                        return res.status(200).send({
                            result: true ,
                            message : "successfully updated." 
                        })
                    }
                }


            res.redirect('/v1/unauthurized')
        }
        catch (e) {
            res.status(400).send({ message : e.message })
        }
    }
}