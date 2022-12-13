const { sequelize } = require('../../models')

module.exports.savePending = (collection) => {
    const pendingData =
        collection.substring(0, 2) !== '0x'
            ? { slug: collection }
            : { contract_address: collection }

    return sequelize.models.pending_collections
        .create(pendingData)
        .then(() => {
            return {
                status: 201,
                content: {
                    statusCode: 201,
                    data: {
                        message:
                            'contract address successfully added in pending list'
                    },
                    error: null
                }
            }
        })
        .catch((e) => {
            return {
                status: 400,
                content: {
                    statusCode: 400,
                    data: null,
                    error: e.message
                }
            }
        })
}
