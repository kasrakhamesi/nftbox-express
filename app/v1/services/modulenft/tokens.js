const { sequleize } = require('../../models')

module.exports.SaveTokenIds = class {
    #collection
    constructor(collection) {
        this.#collection = collection
    }
    init = async () => {}
    #getTokenIds = async () => {}
    #getTokenTraits = async () => {}
}

module.exports.CalculateTokenRank = class {
    #collection
    constructor(collection) {
        this.#collection = collection
    }
}
