const Model = require('../../models').sequelize
const { restful,response } = require('../../libs')
const api = new restful(Model.models.listing_table_items,['listing_table'])

module.exports.handler = async(req, res) => {
    try {

        const METHOD = req.method
        const { id } = req.params
        const body = req.body
        delete body['id']
        delete body['created_at']
        delete body['updated_at']

        switch (METHOD) {
            case 'POST' : 
                return response(await api.Post({body : body , res:res , req : req }),res)

            case 'GET':
                return response(await api.Get({filter : 'id' , params : id , req: req, res:res }), res)

            case 'PUT':
                return response(await api.Put({body : body, filter : 'id', params : id , req : req , res:res }), res)

            case 'DELETE':
                return response(await api.Delete({ filter : 'id', params : id , req: req , res: res }), res)

            default :
                return res.status(400).send({ message : "Method not support." })
        }

    } catch (e) {
        res.status(400).send({ message: e.message })
    }
}

module.exports.userGetTable = async(req,res) => {
    const { id } = req.params

    let resItems = await api.GET('id',id, null, false)
    if (resItems.status !== 200) return response(resItems,res)

    

    
    const serializeItems = (resItems.content.rows).map(item =>  { 
        return {
            ...resItems.content.rows,
            createdAt : undefined
        }
    })
    

    return res.status(resItems.status).send(userWithoutGroup)

}
