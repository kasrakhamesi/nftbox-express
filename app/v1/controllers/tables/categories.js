const Model = require('../../models').sequelize
const { restful,response } = require('../../libs')
const api = new restful(Model.models.categories,['categories'])

module.exports.create = async(req, res) => {
     return response(await api.Post({body : req.body , res : res , req : req , haveLog :true , logDescription : `a Admin try created new category`}),res)
}

module.exports.findAll = async(req, res) => {
    const attributes = { exclude : ['display_name'] }
    return response(await api.Get({ attributes : attributes ,res : res , req : req }),res)
}

module.exports.findOne = async(req, res) => {
    const { id } = req.params
    const attributes = { exclude : ['display_name'] }
    return response(await api.Get({ attributes : attributes , where : { id : id } , res : res , req : req }),res)
}

module.exports.update = async(req, res) => {

    const { id } = req.params
    const body = req.body
    delete body['id']
    delete body['createdAt']
    delete body['updatedAt']

    return response(await api.Put({body : body, where : { id : id } , req : req , res:res , haveLog :true , logDescription : `a Admin try to edit category with id : ${id}`}), res)
}

module.exports.delete = async(req, res) => {
    const { id } = req.params
    return response(await api.Delete({where : { id : id } , req : req , res:res ,haveLog :true , logDescription : `a Admin try to Delete category with id : ${id}`}), res)
}

module.exports.deleteAll = async(req, res) => {
    return res.status(404).send('<h1>404 Not Found</h1>')
}

module.exports.Users = {
    findAll : async(req,res) => {
        return response(await api.Get({ res : res , req : req,checkJwt : false, checkRole : false }),res)
    },
    findOne : async(req,res) => {
        const { id } = req.params
        return response(await api.Get({where : { id : id } , res : res , req : req,checkJwt : false, checkRole : false }),res)
    }
}