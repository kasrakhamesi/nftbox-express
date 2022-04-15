const { restful , response } = require('../../libs')
const Model = require('../../models').sequelize
const api = new restful(Model.models.activitylogs,['activitylogs'])

module.exports.findAll = async(req,res) => {
    return response(await api.Get({ res : res , req : req }),res)
}

module.exports.findOne = async(req,res) => {
    const { id } = req.params
    return response(await api.Get({where : { id : id } , res : res , req : req }),res)
}

module.exports.deleteAll = async(req,res) => { 
    return response({status : 200,content : {result: true ,message : "successfully updated." }},res)
}