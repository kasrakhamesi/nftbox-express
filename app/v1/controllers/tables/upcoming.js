const Model = require('../../models').sequelize
const { restful,response } = require('../../libs')
const api = new restful(Model.models.upcomings,['upcoming_table'])
const categoriesApi = new restful(Model.models.categories,['upcoming_table'])
const upcomingCategoriesApi = new restful(Model.models.upcoming_categories,['upcoming_table'])
const Op = require('sequelize').Op
const _ = require('lodash')

module.exports.create = async(req, res) => {

    try {
    
    const { categories } = req.body

    for (let i = 0; i < categories.length; i++) {
        try {
        const resCheck = await categoriesApi.Get({where : { id : categories[i].id },res : res, req: req})
        if (resCheck.status !== 200)
            return res.status(404).send({ message : `category id not found , please try again` })
        }
        catch (e) {
            return res.status(400).send({ message : e.message })
        }
    }

     const resCreate =  await api.Post({body : req.body , res : res , req : req , haveLog :true , logDescription : `a Admin try to create table`})

     for (let k = 0; k < categories.length; k++) {
         try {
           await upcomingCategoriesApi.Post({body : { upcomingId : resCreate.content.id , categoryId : categories[k].id } , res : res , req : req })
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

     const response = await api.Get({where : { id : resCreate.content.id } , res : res , req : req , include : include })
     res.status(201).send(response.content)
          
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


    const r1 = await Model.models.upcomings.findByPk(id)
    if (r1  === null || r1 === "") return res.status(400).send({ message : `Can't find data.`})

    for (let k = 0; k < body.categories.length; k++) {
        try{
            const r2 = await Model.models.categories.findAll({
                where : {
                    id : body.categories[k].id
                }
            })

            if (_.isEmpty(r2)) {
                return res.status(400).send({ message : `Can't find category data.`})
            }
        }
        catch (e) { return res.status(400).send({ message : e.message }) }
    }

    for (let i = 0; i < body.categories.length; i++) {
        
        try {
            const r2 = await Model.models.upcoming_categories.update(body, {
                where : {
                    [Op.and]: [
                        { categoryId: body.categories[i].id },
                        { upcomingId : id }
                    ]
                }
            })
            
            if (!r2[0] || r2 < 1) {
                return res.status(400).send({ message : `Can't find data.`})
            }
        }
            catch (e) { return res.status(400).send({ message : e.message }) }
    }



    const r = await Model.models.upcomings.update(body,{
        where : {
            id : id
        }
    })

    if (r[0] || r >= 1)
    {
        return res.status(200).send({
            result: true ,
            message : "successfully updated." 
        })
    }

    console.log(r)

    return res.status(400).send({ message : `Can't find data.`})

  

    //return response(await api.Put({body : body, where : { id : id } , req : req , res:res , haveLog :true , logDescription : `a Admin try to Edit category with id : ${id}`}), res)
}

module.exports.delete = async(req, res) => {
    const { id } = req.params
    return response(await api.Delete({where : { id : id } , req : req , res:res , haveLog :true , logDescription : `a Admin try to Delete Table with id : ${id}`}), res)
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
            },
          ]
        const attributes = {
            exclude : ['access_key','enable_access_key','hidden','is_automatic_check','is_upcoming','sortorder']
        }
        return response(await api.Get({ res : res , req : req , attributes : attributes , include : include , checkJwt : false , checkRole : false }),res)
    
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
        const attributes = {
            exclude : ['access_key','enable_access_key','hidden','is_automatic_check','is_upcoming','sortorder']
        }
        return response(await api.Get({where : { id : id } , attributes : attributes , res : res , req : req , include : include ,checkJwt : false, checkRole : false }),res)
    }
}
