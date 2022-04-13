const Model = require('../../models').sequelize
const { restful,response } = require('../../libs')
const api = new restful(Model.models.listing_table_items,['listing_table'])

module.exports.create = async(req, res) => {
     return response(await api.Post({body : req.body , res : res , req : req }),res)
}

module.exports.findAll = async(req, res) => {
    return response(await api.Get({ res : res , req : req }),res)
}

module.exports.findOne = async(req, res) => {
    const { id } = req.params
    return response(await api.Get({where : { id : id } , res : res , req : req }),res)
}

module.exports.update = async(req, res) => {

    const { id } = req.params
    const body = req.body
    delete body['id']
    delete body['createdAt']
    delete body['updatedAt']

    return response(await api.Put({body : body, where : { id : id } , req : req , res:res }), res)
}

module.exports.delete = async(req, res) => {
    const { id } = req.params
    return response(await api.Delete({where : { id : id } , req : req , res:res }), res)
}

module.exports.deleteAll = async(req, res) => {
    return res.status(404).send('<h1>404 Not Found</h1>')
}

module.exports.Users = {
    findAll : async(req,res) => {
        let data = await api.Get({ res : res , req : req , checkJwt : false , checkRole : false })
        res.status(data?.status).send(data)
    },
    findOne : async(req,res) => {
        const { id } = req.params
        return response(await api.Get({where : { id : id } , res : res , req : req ,checkJwt : false, checkRole : false}),res)
    }
}
