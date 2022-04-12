'use strict'
const { permissions } = require('../middlewares')
const _ = require('lodash')

class Restful {
    #model
    #adminPermissions
    constructor(model,adminPermissions) {
        this.#model = model
        this.#adminPermissions = adminPermissions
    }

    /*
     @ Check the admin have permission to get or set target data or not
    */

    #checkPermissions = async (roleId) => {
        try {
            const resCheckPermission = await permissions.check(roleId, this.#adminPermissions)
            if (resCheckPermission != true)
                return resCheckPermission
            return true
        }
        catch (e) {
            return {
                status : 400,
                content : { message : e.message }
            }
        }
    }

    #checkJwtToken = (req,res) => {
        try {
            if (req.isAuthenticated(req, res)) {
                const roleId = req.user[0].role.id
                return { 
                    status : 200 ,
                    roleId : roleId 
                }
            }
            return { 
                status : 401 ,
                content : { message : "Authentication failed" }
            }
        }
        catch (e) {
             return {
                 status : 400 ,
                 content : { message : e.message } 
                }
            }
    }
    /*
     @ Get method for updating or changing data
    */

    Get = async ({
            filter : filter = null,
            params : params = null,
            checkJwt : checkJwt = true,
            roleId : roleId = null,
            checkRole : checkRole = true,
            req : req,
            res : res,
            include : include = null,
            where : where = null
        }) => {

        if (checkJwt && roleId == null)
        {
            const resCheckJwt = this.#checkJwtToken(req,res)
            if (resCheckJwt.status !== 200) return res.status(resCheckJwt.status).send(resCheckJwt.content)
            roleId = resCheckJwt?.roleId
        }

        if (checkRole) {
            const resPermissions = await this.#checkPermissions(roleId)
            if (resPermissions != true) return res.status(resPermissions.status).send(resPermissions.content)
        }

        if (where !== null) {
            const resGet = await this.#model.findAndCountAll({
                order: [
                    ['id', 'DESC']
                ],
                where : where
            })
            return {
                status : 200,
                content : resGet
            }
        }

        else if (filter === undefined || filter === null || filter === "" || params === undefined || params === null || params === "") {

            const resGetAll = await this.#model.findAndCountAll({
                order: [
                    ['id', 'DESC']
                ]
            })
            return {
                status : 200,
                content : resGetAll
            }
        }
        else if (String(filter).toLowerCase() === "id")
        {
            const resGetById = await this.#model.findByPk(parseInt(params))
            return { 
                status : _.isEmpty(resGetById) ? 404 : 200 ,
                content : resGetById || { message : `Can't find this data.` }
            }
        }
        const resGet = await this.#model.findAndCountAll({
            where: {
                [filter]: params
            }
        })
        return {
            status : _.isEmpty(resGet) ? 404 : 200,
            content : resGet
        }
    }

    /*
     @ Post method for create data
    */
   
    Post = async ({
        body : body ,
        roleId : roleId = null ,
        checkJwt : checkJwt = true,
        checkRole : checkRole = true,
        req : req,
        res: res
        }) => {

        if (checkJwt && roleId == null)
        {
            const resCheckJwt = this.#checkJwtToken(req,res)
            if (resCheckJwt.status !== 200) return res.status(resCheckJwt.status).send(resCheckJwt.content)
            roleId = resCheckJwt?.roleId
        }

        if (checkRole) {
            const resPermissions = await this.#checkPermissions(roleId)
            if (resPermissions != true) return res.status(resPermissions.status).send(resPermissions.content)
        }

        const resCreate = await this.#model.create(body)
        return {
            status : 201,
            content : resCreate
        }
    }

    /*
     @ PUT method for updating or changing data
    */

    Put = async ({
        body : body ,
        filter : filter = null,
        params : params = null,
        roleId : roleId = null ,
        checkJwt : checkJwt = true,
        checkRole : checkRole = true,
        req : req,
        res : res
        }) => {

        if (checkJwt && roleId == null)
        {
            const resCheckJwt = this.#checkJwtToken(req,res)
            if (resCheckJwt.status !== 200) return res.status(resCheckJwt.status).send(resCheckJwt.content)
            roleId = resCheckJwt?.roleId
        }

        if (filter === undefined || filter === null || filter === "" || params === undefined || params === null || params === "") return res.status(400).send({message : "Please set item id to update row."})

        if (checkRole) {
            const resPermissions = await this.#checkPermissions(roleId)
            if (resPermissions != true) return res.status(resPermissions.status).send(resPermissions.content)
        }

        const resUpdate = await this.#model.update(body, {
            where: {
                [filter]: params
            }
        })
        if (resUpdate === 1) {
            const resGet = (await this.#model.findAll({
                where: {
                    [filter]: params
                }
            }))[0]
            return { 
                status : 200,
                content : resGet
            }
        }
        return {
            status : 404, 
            content : { message : `Can't find this data.`}
        }
    }

    /*
     @ Delete method for updating or changing data
    */

    Delete = async ({
        filter : filter = null,
        params : params = null,
        roleId : roleId = null ,
        checkJwt : checkJwt = true,
        checkRole : checkRole = true ,
        req : req ,
        res : res
        }) => {

        if (checkJwt && roleId == null)
        {
            const resCheckJwt = this.#checkJwtToken(req,res)
            if (resCheckJwt.status !== 200) return res.status(resCheckJwt.status).send(resCheckJwt.content)
            roleId = resCheckJwt?.roleId
        }

        if (filter === undefined || filter === null || filter === "" || params === undefined || params === null || params === "") return res.status(400).send({message : "Please set item id to delete row."})

        if (checkRole) {
            const resPermissions = await this.#checkPermissions(roleId)
            if (resPermissions != true) return res.status(resPermissions.status).send(resPermissions.content)
        }

        const resDelete = await this.#model.destroy({
            where: {
                [filter]: params
            }
        })
        if (resDelete === 1)
            return { 
                status : 200,
                content : 
                    {
                        result: true ,
                        message : "successfully deleted." 
                    }
                }

        return {
            status : 404, 
            content : { message : `Can't find this data.`}
        }
    }
}

module.exports = Restful