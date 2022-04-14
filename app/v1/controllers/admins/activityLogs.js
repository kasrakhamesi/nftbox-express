const { restful , response } = require('../../libs')
const Model = require('../../models').sequelize
const api = new restful(Model.models.listing_table_items,['logs'])

module.exports.findAll = async(req,res) => {

}

module.exports.findOne = async(req,res) => {

}

module.exports.deleteAll = async(req,res) => {
    
}

module.exports.handler = async(req, res) => {
    try {
        
        const METHOD = req.method
        const { id } = req.params

        switch (METHOD) {
            case 'GET':
                return response(await api.Get({ filter : 'id' , params : id , req: req, res:res }),res)

            case 'DELETE':
                return response(await api.Delete({ filter : 'id', params : id}), res)

            default :
                return res.status(400).send({ message : "Method not support." })
        }
        
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
}
