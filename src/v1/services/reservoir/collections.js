const { sequelize } = require('../../models')
const pendingCollections = require('../collections/pendings')
const _ = require('lodash')
const axios = require('axios')
const { database } = require('../../utils')
require('dotenv').config()
const sdk = require('api')('@reservoirprotocol/v1.0#cpy2fla8spifn')

const isoToTimestamp = (isoTime) => {
  String(new Date(isoTime).getTime())
}

const generateTwitterUrl = (twitterUsername) =>
  twitterUsername ? `https://twitter.com/${twitterUsername}` : null

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
      for (const entity of r.collections) {
        const body = collectionStructure(
          entity?.id,
          entity?.slug,
          entity?.name,
          isoToTimestamp(entity?.createdAt),
          entity?.openseaVerificationStatus === 'verified' ? true : false,
          entity?.floorAsk?.amount?.decimal,
          entity?.onSaleCount,
          entity?.tokenCount,
          entity?.volume['1day'] || 0,
          entity?.volume['7day'] || 0,
          entity?.volume?.allTime || 0,
          entity?.banner,
          entity?.description,
          entity?.image,
          generateTwitterUrl(entity?.twitterUsername),
          entity?.discordUrl,
          entity?.externalUrl,
          null,
          null
        )
        database
          .upsert(
            body,
            {
              contract_address: entity?.id
            },
            sequelize.models.collections
          )
          .then(console.log)
          .catch(console.log)
      }

      totalCount += 20
      console.log(totalCount)
      continuation = r?.continuation || null
    } while (continuation !== null && totalCount < 50)
  } catch (e) {
    console.log(e)
  }
}

const collectionStructure = (
  contract_address,
  collection_slug,
  collection_name,
  collection_creation_date,
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
    collection_creation_date,
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
