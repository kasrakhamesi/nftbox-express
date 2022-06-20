const { sequelize } = require('../../models')
const { Client } = require('twitter.js')

const client = new Client()

const getData = async () => {
    try {
        const resFind = sequelize.models.upcomings.findAll({
            where: {
                //  twitter_
            }
        })
    } catch (e) {
        console.log(e)
    }
}

const checkUsername = async (twitterLink) => {
    try {
        const resTwitterBearerToken = sequelize.models.configurations.findAll({
            where: {
                key: 'TwitterApiBearerToken'
            },
            limit: 1
        })
        if (resTwitterBearerToken === null)
            throw new Error('invalid config or config not found,try again')

        await client.loginWithBearerToken(resTwitterBearerToken)
    } catch (e) {
        return {
            status: 400,
            content: {
                message: e.message
            }
        }
    }
}

const twitterToken =
    'AAAAAAAAAAAAAAAAAAAAAERkbgEAAAAAwteJU20DinzI5WVRm0ADPuKHFKs%3Df4goyDof9CcXcuptq0xPJgonEFCtqO8epw4FYVANOCEb8CArWW'

module.exports.check = async () => {
    try {
        await client.loginWithBearerToken(twitterToken)

        const resTwitterUser = await client.users.fetchByUsername(
            'oddstronauts'
        )
        const serializeData = {
            twitter_description: resTwitterUser.description,
            collection_image: resTwitterUser.profileImageURL,
            twitter_member: resTwitterUser.publicMetrics.followersCount
        }
        return serializeData
    } catch (e) {
        console.log(e)
    }
}
