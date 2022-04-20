const Model = require('../../models').sequelize
const { restful,response } = require('../../libs')
const api = new restful(Model.models.upcomings,['upcoming_table'])
const categoriesApi = new restful(Model.models.categories,['upcoming_table'])
const upcomingCategoriesApi = new restful(Model.models.upcoming_categories,['upcoming_table'])

module.exports.create = async(req, res) => {

    try {
    
    const { categoriesId } = req.body

    for (let i = 0; i < categoriesId.length; i++) {
        try {
        const resCheck = await categoriesApi.Get({where : { id : categoriesId[i] },res : res, req: req})
        if (resCheck.status !== 200)
            return res.status(404).send({ message : "category id not found , please try again" })
        }
        catch (e) {
            return res.status(400).send({ message : e.message })
        }
    }

     const resCreate =  await api.Post({body : req.body , res : res , req : req })

     for (let k = 0; k < categoriesId.length; k++) {
         try {
           await upcomingCategoriesApi.Post({body : { upcomingId : resCreate.content.id , categoryId : categoriesId[k]} , res : res , req : req })
         }
         catch { continue }
     }

     const include = [
        {
          model: Model.models.categories,
          as: "categories",
          attributes : {
              exclude : ['display_name']
          },
          through: {
            attributes: { exclude : ['upcomingId' , 'categoryId' , 'createdAt' , 'updatedAt'] },
          }
        }
      ] 
      
     return response(await api.Get({where : { id : resCreate.content.id } , res : res , req : req , include : include }),res)
          
    }
    catch (e) { res.status(400).send({ message : e.message }) }
}

module.exports.findAll = async(req, res) => {
    const include = [
        {
          model: Model.models.categories,
          as: "categories",
          attributes : {
              exclude : ['display_name']
          },
          through: {
            attributes: { exclude : ['upcomingId' , 'categoryId' , 'createdAt' , 'updatedAt'] },
          }
        }
      ] 
    return response(await api.Get({ res : res , req : req , include : include }),res)
}

module.exports.findOne = async(req, res) => {
    const { id } = req.params

    const include = [
        {
          model: Model.models.categories,
          as: "categories",
          attributes : {
              exclude : ['display_name']
          },
          through: {
            attributes: { exclude : ['upcomingId' , 'categoryId' , 'createdAt' , 'updatedAt'] },
          }
        }
      ] 
    return response(await api.Get({where : { id : id } , res : res , req : req , include : include }),res)
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
        const include = [
            {
              model: Model.models.categories,
              as: "categories",
              attributes : {
                  exclude : ['display_name']
              },
              through: {
                attributes: { exclude : ['upcomingId' , 'categoryId' , 'createdAt' , 'updatedAt'] },
              }
            }
          ] 
        return response(await api.Get({ res : res , req : req , include : include , checkJwt : false , checkRole : false }),res)
    
    },
    findOne : async(req,res) => {
        const { id } = req.params

        const include = [
            {
              model: Model.models.categories,
              as: "categories",
              attributes : {
                  exclude : ['display_name']
              },
              through: {
                attributes: { exclude : ['upcomingId' , 'categoryId' , 'createdAt' , 'updatedAt'] },
              }
            }
          ] 
        return response(await api.Get({where : { id : id } , res : res , req : req , include : include ,checkJwt : false, checkRole : false }),res)
    }
}
