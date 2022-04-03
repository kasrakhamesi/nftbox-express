const jsonwebtoken = require('jsonwebtoken')
const managerAccess = 'qqqqq'
const auth = {}

auth.jwt =
    ({
        id: id,
        roleId: roleId,
        email: email,
        password: password
    }) => {

        if (email != null || email != '')
            return jsonwebtoken.sign({
                id: id,
                roleId: roleId,
                email: email,
                password: password,
                isAdmin: true
            }, managerAccess, { expiresIn: '36000s' })

        return null
    }


auth.managerDecodeJwt = encodedString => {
    return jsonwebtoken.decode(encodedString, managerAccess)
}

module.exports = auth