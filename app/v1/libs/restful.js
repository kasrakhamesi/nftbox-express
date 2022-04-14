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
            checkJwt : checkJwt = true,
            roleId : roleId = null,
            checkRole : checkRole = true,
            req : req,
            res : res,
            include : include = null,
            where : where = null,
            order : order = null,
            limit : limit = null,
            attributes : attributes = null
        }) => {

        try {
            
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
            
            const resGet = where?.id ? (await this.#model.findByPk(parseInt(where?.id))) : (await this.#model.findAndCountAll({
                where : where,
                attributes : attributes,
                include : include,
                order : order,
                limit : limit
            }))

            return {
                status : _.isEmpty(resGet) ? 404 : 200,
                content : resGet || { message : `Can't find data.` }
            }
        }
        catch (e) { 
            return {
                status : 400,
                content : { message : e.message }
            }
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
        
        try {

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
        catch (e) { 
            return {
                status : 400,
                content : { message : e?.errors[0]?.message || e.message }
            }
        }
    }

    /*
     @ PUT method for updating or changing data
    */

    Put = async ({
        body : body ,
        roleId : roleId = null ,
        checkJwt : checkJwt = true,
        checkRole : checkRole = true,
        req : req,
        res : res,
        where : where = null
        }) => {

        try {

            if (checkJwt && roleId == null)
            {
                const resCheckJwt = this.#checkJwtToken(req,res)
                if (resCheckJwt.status !== 200) return res.status(resCheckJwt.status).send(resCheckJwt.content)
                roleId = resCheckJwt?.roleId
            }

            if (where === undefined || where === null || where === "" ) return res.status(400).send({message : "Please select item to update row."})

            if (checkRole) {
                const resPermissions = await this.#checkPermissions(roleId)
                if (resPermissions != true) return res.status(resPermissions.status).send(resPermissions.content)
            }

            const resUpdate = await this.#model.update(body, {
                where: where
            })

            if (resUpdate[0] || resUpdate >= 1) {
                return { 
                    status : 200,
                    content : 
                        {
                            result: true ,
                            message : "successfully updated." 
                        }
                    }
            }
            return {
                status : 404, 
                content : { message : `Can't find data.`}
            }
         }
        catch (e) { 
            return {
                status : 400,
                content : { message : e?.errors[0]?.message || e.message }
            }
        }
    }

    /*
     @ Delete method for updating or changing data
    */

    Delete = async ({
        roleId : roleId = null ,
        checkJwt : checkJwt = true,
        checkRole : checkRole = true ,
        req : req ,
        res : res,
        where: where = null
        }) => {

        try {

            if (checkJwt && roleId == null)
            {
                const resCheckJwt = this.#checkJwtToken(req,res)
                if (resCheckJwt.status !== 200) return res.status(resCheckJwt.status).send(resCheckJwt.content)
                roleId = resCheckJwt?.roleId
            }

            if (where === undefined || where === null || where === "" ) return res.status(400).send({message : "Please select item to update row."})

            if (checkRole) {
                const resPermissions = await this.#checkPermissions(roleId)
                if (resPermissions != true) return res.status(resPermissions.status).send(resPermissions.content)
            }

            const resDelete = await this.#model.destroy({
                where: where
            })

            if (resDelete[0] || resDelete >= 1)
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
                content : { message : `Can't find data.`}
            }
        }
        catch (e) { 
            return {
                status : 400,
                content : { message : e.message }
            }
        }
    }
}

module.exports = Restful