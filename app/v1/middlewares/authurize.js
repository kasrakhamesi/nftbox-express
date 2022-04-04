const jsonwebtoken = require('jsonwebtoken')
const managerAccess = 'qqqqq'
const auth = {}

auth.jwt =
    ({
        id: id,
    }) => {
        return jsonwebtoken.sign({
            id: id,
            isAdmin: true
        }, managerAccess, { expiresIn: '36000s' })
    }

auth.managerDecodeJwt = encodedString => {
    return jsonwebtoken.decode(encodedString, managerAccess)
}

module.exports = auth