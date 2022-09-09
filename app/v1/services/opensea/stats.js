const axios = require('axios')
const { sequelize } = require('../../models')
require('dotenv').config()

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

module.exports.getStats = async () => {
  try {
    const resCollections = await sequelize.models.collections.findAll()

    for (let k = 0; k < resCollections.length; k++) {
      try {
        await delay(600)

        const resAxios = await axios.get(
          `/collection/${resCollections[k].collection_slug}/stats`
        )

        if (resAxios.status !== 200) continue

        await sequelize.models.collections.update(
          {
            sales_volume: String(resAxios.data.stats.total_sales),
            average_price: String(resAxios.data.stats.average_price),
            one_day_sales: String(resAxios.data.stats.one_day_sales),
            seven_day_sales: String(resAxios.data.stats.seven_day_sales)
          },
          {
            where: {
              collection_slug: resCollections[k].collection_slug
            }
          }
        )
      } catch (e) {
        console.log(e)
        continue
      }
    }
  } catch (e) {
    cosole.log(e)
  }
}
