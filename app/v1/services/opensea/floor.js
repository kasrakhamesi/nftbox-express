const Model = require('../../models').sequelize
const axios = require('axios')
require('dotenv').config()

const getFloorPrice = async () => {
    try {
        const listingItems = await Model.models.listing_table_items.findAll()
        if (listingItems.length <= 0) return

        let url = `${process.env.MODULE_NFT_URL}/collection/batchInfo?`
        let payload = null
        for (let k = 0; k < listingItems.length; k++) {
            try {
                const contractAddress = listingItems[k].contract_address
                payload += `type=${contractAddress}&`
            } catch {
                continue
            }
        }
        payload = payload.substr(4, payload.length).slice(0, -1)
        const res = await axios.get(url + payload)
        const data = res.data
        if (res.status !== 200) return

        for (let i = 0; i < data.length; i++) {
            try {
                if (data[i]?.error !== null) {
                    continue
                }
            } catch (e) {
                console.log(e)
            }
        }
    } catch (e) {
        console.log(e)
    }
}

module.exports = getFloorPrice
