const Model = require('../../models').sequelize
const { restful,response } = require('../../libs')
const api = new restful(Model.models.whitelist_addresses,['whitelist_addresses'])

module.exports = {
    create : async(req,res) =>
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
        return response(await api.Get({res : res , req : req }),res)
    },
    findOne : async(req,res) => { 
        const { id } = req.params
        return response(await api.Get({where : { id : id } , res : res , req : req }),res)
    },
    delete : async(req,res) => {
        const { id } = req.params
        return response(await api.Delete({where : { id : id } , req : req , res:res }), res)
    }
}