const { sequelize } = require('../../models')
const { restful, response } = require('../../libs')
const api = new restful(sequelize.models.collections, ['trendings'])

module.exports.findAll = async (req, res) => {
    try {
        const { ticker } = req.params

        let haveError = false

        const attributes =
            ticker == '1m'
                ? {
                      include: [
                          'contract_address',
                          'collection_name',
                          'collection_slug',
                          'image_url',
                          'one_minute_floor_price',
                          'one_minute_market_cap',
                          'one_minute_sales',
                          'one_minute_listings',
                          'one_minute_volume'
                      ]
                  }
                : ticker == '5m'
                ? {
                      include: [
                          'contract_address',
                          'collection_name',
                          'collection_slug',
                          'image_url',
                          'five_minute_floor_price',
                          'five_minute_market_cap',
                          'five_minute_sales',
                          'five_minute_listings',
                          'five_minute_volume'
                      ]
                  }
                : ticker == '15m'
                ? {
                      include: [
                          'contract_address',
                          'collection_name',
                          'collection_slug',
                          'image_url',
                          'fifteen_minute_floor_price',
                          'fifteen_minute_market_cap',
                          'fifteen_minute_sales',
                          'fifteen_minute_listings',
                          'fifteen_minute_volume'
                      ]
                  }
                : ticker == '1h'
                ? {
                      include: [
                          'contract_address',
                          'collection_name',
                          'collection_slug',
                          'image_url',
                          'one_hour_floor_price',
                          'one_hour_market_cap',
                          'one_hour_sales',
                          'one_hour_listings',
                          'one_hour_volume'
                      ]
                  }
                : ticker == '6h'
                ? {
                      include: [
                          'contract_address',
                          'collection_name',
                          'collection_slug',
                          'image_url',
                          'six_hour_floor_price',
                          'six_hour_market_cap',
                          'six_hour_sales',
                          'six_hour_listings',
                          'six_hour_volume'
                      ]
                  }
                : ticker == '12h'
                ? {
                      include: [
                          'contract_address',
                          'collection_name',
                          'collection_slug',
                          'image_url',
                          'twelve_hour_floor_price',
                          'twelve_hour_market_cap',
                          'twelve_hour_sales',
                          'twelve_hour_listings',
                          'twelve_hour_volume'
                      ]
                  }
                : ticker == '1d'
                ? {
                      include: [
                          'contract_address',
                          'collection_name',
                          'collection_slug',
                          'image_url',
                          'one_day_floor_price',
                          'one_day_market_cap',
                          'one_day_sales',
                          'one_day_listings',
                          'one_day_volume'
                      ]
                  }
                : ticker == '7d'
                ? {
                      include: [
                          'contract_address',
                          'collection_name',
                          'collection_slug',
                          'image_url',
                          'seven_day_floor_price',
                          'seven_day_market_cap',
                          'seven_day_sales',
                          'seven_day_listings',
                          'seven_day_volume'
                      ]
                  }
                : (haveError = true)

        if (haveError) throw new Error('Invalid Ticker Time')

        const resTrendingData = await api.Get({
            res: res,
            where: {
                is_trending: true
            },
            attributes: attributes,
            req: req,
            checkJwt: false,
            checkRole: false
        })

        const data =
            resTrendingData.length === 0
                ? resTrendingData.content
                : resTrendingData.content.rows.map((item) => {
                      return {
                          contract_address: item.contract_address,
                          collection_name: item.collection_name,
                          collection_slug: item.collection_slug,
                          image_url: item.image_url,
                          verified: item.verified,
                          created_date: String(Date.now()),
                          collection_creation_date: String(Date.now()),
                          floor_price: '0.05',
                          /*
                      ticker == '1m'
                          ? item.one_minute_floor_price
                          : ticker == '5m'
                          ? item.five_minute_floor_price
                          : ticker == '15m'
                          ? item.fifteen_minute_floor_price
                          : ticker == '1h'
                          ? item.one_hour_floor_price
                          : ticker == '6h'
                          ? item.six_hour_floor_price
                          : ticker == '12h'
                          ? item.twelve_hour_floor_price
                          : ticker == '1d'
                          ? item.one_day_floor_price
                          : item.seven_day_floor_price,
                          */ floor_price_change_percent: '0 %',
                          volume: '5150',
                          /*
                      ticker == '1m'
                          ? item.one_minute_volume
                          : ticker == '5m'
                          ? item.five_minute_volume
                          : ticker == '15m'
                          ? item.fifteen_minute_volume
                          : ticker == '1h'
                          ? item.one_hour_volume
                          : ticker == '6h'
                          ? item.six_hour_volume
                          : ticker == '12h'
                          ? item.twelve_hour_volume
                          : ticker == '1d'
                          ? item.one_day_volume
                          : item.seven_day_volume,
                          */ volume_change_percent: '-205 %',
                          listings: '52',
                          /*
                      ticker == '1m'
                          ? item.one_minute_listings
                          : ticker == '5m'
                          ? item.five_minute_listings
                          : ticker == '15m'
                          ? item.fifteen_minute_listings
                          : ticker == '1h'
                          ? item.one_hour_listings
                          : ticker == '6h'
                          ? item.six_hour_listings
                          : ticker == '12h'
                          ? item.twelve_hour_listings
                          : ticker == '1d'
                          ? item.one_day_listings
                          : item.seven_day_listings,
                          */ listings_change_percent: '-19 %',
                          sales: '61',
                          /*
                      ticker == '1m'
                          ? item.one_minute_sales
                          : ticker == '5m'
                          ? item.five_minute_sales
                          : ticker == '15m'
                          ? item.fifteen_minute_sales
                          : ticker == '1h'
                          ? item.one_hour_sales
                          : ticker == '6h'
                          ? item.six_hour_sales
                          : ticker == '12h'
                          ? item.twelve_hour_sales
                          : ticker == '1d'
                          ? item.one_day_sales
                          : item.seven_day_sales,
                          */ sales_change_percent: '-15 %',
                          market_cap: '51551',
                          /*
                      ticker == '1m'
                          ? item.one_minute_market_cap
                          : ticker == '5m'
                          ? item.five_minute_market_cap
                          : ticker == '15m'
                          ? item.fifteen_minute_market_cap
                          : ticker == '1h'
                          ? item.one_hour_market_cap
                          : ticker == '6h'
                          ? item.six_hour_market_cap
                          : ticker == '12h'
                          ? item.twelve_hour_market_cap
                          : ticker == '1d'
                          ? item.one_day_market_cap
                          : item.seven_day_market_cap,
                          */ market_cap_change_percent: '15 %'
                      }
                  }) //         count : resTrendingData.content.count , row :

        res.status(resTrendingData.status).send({
            count: resTrendingData.content.count,
            rows: data
        })
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
}
module.exports.findOne = async (req, res) => {
    const { id } = req.params
    return response(
        await api.Get({
            where: { id: id },
            res: res,
            where: {
                is_trending: true
            },
            req: req,
            checkJwt: false,
            checkRole: false
        }),
        res
    )
}
