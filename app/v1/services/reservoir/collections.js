const { sequelize } = require('../../models')
const pendingCollections = require('../collections/pendings')
const _ = require('lodash')
const axios = require('axios')
require('dotenv').config()
const sdk = require('api')('@reservoirprotocol/v1.0#1fag0v1k3l7sxff82')

module.exports.save = async () => {
  try {
    let apiKey = await sequelize.models.configurations.findOne({
      where: {
        key: 'ReservoirApiKey'
      }
    })

    apiKey = _.isEmpty(apiKey)
      ? 'f042cd77-177d-4c91-bc1e-2fd4b5dd101a'
      : apiKey?.value

    sdk.auth(apiKey)

    const data = []
    let continuation = null
    let totalCount = 0
    do {
      const body = {
        includeTopBid: 'false',
        sortBy: '1DayVolume',
        limit: '20',
        //continuation: '',
        accept: '*/*'
      }

      if (continuation !== null) {
        body.continuation = continuation
      }

      const r = await sdk.getCollectionsV5(body)
      for (const entity of r.collections)
        data.push(
          collectionStructure(entity.id, entity.slug, entity.name, false)
        )

      totalCount += 20
      console.log(totalCount)
      continuation = r?.continuation || null
    } while (continuation !== null && totalCount < 50)

    console.log(data)

    console.log('--')
  } catch (e) {
    console.log(e)
  }
}

const collectionStructure = (
  contract_address,
  collection_slug,
  collection_name,
  verified,
  floor_price,
  owners_count,
  total_supply,
  one_day_volume,
  seven_day_volume,
  volume_traded,
  banner_image_url,
  description,
  image_url,
  twitter_url,
  discord_url,
  website_url,
  telegram_url,
  instagram_url
) => {
  return {
    contract_address,
    collection_slug,
    collection_name,
    verified,
    floor_price,
    owners_count,
    total_supply,
    one_day_volume,
    seven_day_volume,
    volume_traded,
    contract_address,
    banner_image_url,
    description,
    image_url,
    twitter_url,
    discord_url,
    website_url,
    telegram_url,
    instagram_url,
    percent_owner:
      total_supply < owners_count
        ? 'N/A'
        : String(
            parseInt((parseInt(owners_count) * 100) / parseInt(total_supply))
          ),
    is_trending: true,
    collection_type: total_supply < owners_count ? 'erc1155' : 'erc721'
  }
}
