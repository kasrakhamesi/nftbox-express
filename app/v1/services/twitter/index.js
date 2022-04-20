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
        const resTwitterBearerToken = Model.models.configurations.findAll({
            where : {
                key : "TwitterApiBearerToken"
            },
            limit : 1
        })
        if (resTwitterBearerToken === null) throw new APIError("invalid config or config not found,try again")

        await client.loginWithBearerToken(resTwitterBearerToken)
        
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