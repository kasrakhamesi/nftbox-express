const { Client }  = require('twitter.js')
const client = new Client()
const Model = require('../../models').sequelize
const { APIError } = require('./app/v1/config')

const getData = async() => {
    try {
        const resFind = Model.models.upcomings.findAll({
            where : {
              //  twitter_
            }
        })
    }
    catch (e) { console.log(e) } 
}

const checkUsername = async(twitterLink) => {
    try {
        const resConfigurations = Model.models.configurations.findAll({
            where : {
                key : "Twitter_Api_BearerToken"
            },
            limit : 1
        })
        if (resConfigurations === null) throw new APIError("invalid config or config not found,try again")
        client.loginWithBearerToken()
    }
    catch (e) { 
        return {
            status : 400,
            content : {
                message : e.message
            }
        } 
    }
}