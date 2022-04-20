const Model = require('../../models').sequelize
const { restful,response } = require('../../libs')
const api = new restful(Model.models.configurations,['configurations'])

module.exports = {
    update : async(req,res) => {
        const { key } = req.params
        const body = req.body
        delete body['key']

        const condition = { 
            key : key
        }
        return response(await api.Put({body : body , req : req , res : res , where : condition }))
    },
    findAll : async(req,res) => {
        return response(await api.Get({ where : { is_global : false } , res : res , req : req }),res)
    }
}