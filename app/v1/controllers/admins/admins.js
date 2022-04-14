const Model = require('../../models').sequelize
const { permissions,authurize } = require('../../middlewares')
const admins = {}
const { restful,response } = require('../../libs')
const api = new restful(Model.models.admins,['admnis'])

module.exports = {
    register : async(req,res) =>
    {
        const body = req.body
        delete body['id']
        return response(await api.Post({body : body , req:req , res:res }),res)
    },
    update : async(req,res) => {
        const { id } = req.params
        const body = req.body
        delete body['id']

        const condition = { 
            id : id
        }
        return response(await api.Put({body : body , req : req , res : res , where : condition }))
    },
    findAll : async(req,res) => {

    },
    findOne : async(req,res) => { 

    },
    delete : async(req,res) => {

    }
}