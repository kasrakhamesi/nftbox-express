const axios = require('axios')
const { sequelize } = require('../../models')
const { Op } = require('sequelize')
const _ = require('lodash')
const { database } = require('../../utils')
require('dotenv').config()

const generateTwitterUrl = (twitterUsername) =>
  twitterUsername ? `https://twitter.com/${twitterUsername}` : null

const generateInstagramUrl = (instagramUsername) =>
  instagramUsername ? `https://instagram.com/${instagramUsername}` : null

const getTimestampFromIsoTime = (isoTime) => {
  let timestamp = String(new Date(isoTime).getTime())
  if (timestamp.length === 10) timestamp = parseInt(timestamp) * 1000
  return timestamp
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
  instagram_url,
  one_day_sales,
  seven_day_sales,
  collection_type
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
    one_day_sales,
    seven_day_sales,
    collection_type,
    percent_owner:
      total_supply < owners_count
        ? 'N/A'
        : String(
            parseInt((parseInt(owners_count) * 100) / parseInt(total_supply))
          ),
    is_trending: true
  }
}

const getTrendings = async () => {
  try {
    let apiKey = await sequelize.models.configurations.findOne({
      where: {
        key: 'ModuleNftApiKey'
      }
    })

    apiKey = _.isEmpty(apiKey) ? 'demo' : apiKey?.value

    const r = await axios({
      method: 'get',
      url: `${process.env.MODULE_NFT_BASEURL}/eth/nft/ranks?orderBy=volume&timeRange=day&count=100&offset=0&marketplace=Opensea`,
      headers: {
        'X-API-KEY': apiKey
      }
    })

    const trendingCollections = []

    if (_.isEmpty(r?.data?.data))
      throw new Error("Can't find trending collections")

    for (const entity of r?.data?.data) {
      trendingCollections.push({
        contract_address: entity?.contractAddress
      })
      const data = collectionStructure(
        entity?.contractAddress || null,
        entity?.slug,
        entity?.data?.name,
        getTimestampFromIsoTime(entity?.data?.created_date),
        entity?.safelist_request_status === 'verified' ? true : false,
        null, // FLOOR PRICE
        entity?.data?.owner,
        entity?.totalSupply,
        entity?.dailyVolume,
        entity?.WeeklyVolume,
        entity?.allTimeVolume,
        entity?.data?.banner_image_url,
        entity?.data?.description,
        entity?.data?.image_url,
        generateTwitterUrl(entity?.data?.twitter_username),
        entity?.data?.discord_url,
        entity?.data?.external_url,
        entity?.data?.telegram_url,
        generateInstagramUrl(entity?.data?.instagram_username),
        entity?.dailySalesCount,
        entity?.weeklySalesCount,
        String(entity?.data?.schema_name).toLowerCase()
      )

      database
        .upsert(
          data,
          {
            contract_address: entity?.contractAddress
          },
          sequelize.models.collections
        )
        .then(console.log)
        .catch(console.log)
    }
    await sequelize.models.collections.update(
      { is_trending: false },
      {
        where: {
          [Op.not]: trendingCollections
        }
      }
    )
  } catch (e) {
    console.log(e)
  }
}

module.exports = { getTrendings }
