const axios = require('axios')
const { sequelize } = require('../../models')
const { pendings } = require('../collections')
const { Op } = require('sequelize')
const _ = require('lodash')
require('dotenv').config()
const { database } = require('../../utils')

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

const getCollectionInfo = async (collection) => {
  try {
    const findedCollection = await sequelize.models.collections.findOne({
      where: {
        [Op.or]: [
          {
            contract_address: collection
          },
          { collection_slug: collection }
        ]
      }
    })

    if (!_.isEmpty(findedCollection))
      throw new Error('We have this collection in our database')

    let apiKey = await sequelize.models.configurations.findOne({
      where: {
        key: 'ModuleNftApiKey'
      }
    })

    apiKey = _.isEmpty(apiKey) ? null : apiKey?.value

    const r = await axios({
      method: 'get',
      url: `${process.env.MODULE_NFT_BASEURL}/opensea/collection/info?type=${collection}`,
      headers: {
        'X-API-KEY': apiKey
      }
    })

    if (r.status !== 200)
      throw new Error("Request Can't Loaded , please try again")

    if (r.data.error !== null) throw new Error(String(r.data.error))

    const resTraits = await getTraits(collection)

    if (!resTraits.isSuccess) throw new Error(resTraits?.message)

    const body = {
      collection_slug: r.data.info.slug,
      collection_name: r.data.info.name,
      contract_address: r.data.info.contractAddress,
      banner_image_url: r.data.info.bannerImageUrl,
      description: r.data.info.description,
      image_url: r.data.info.imageUrl,
      twitter_url: generateTwitterUrl(r.data.info.twitterUsername),
      discord_url: r.data.info.discordUrl,
      website_url: r.data.info.externalUrl,
      verified: r.data.info.isVerified,
      telegram_url: r.data.info.telegramUrl,
      instagram_url: generateInstagramUrl(r.data.info.instagramUsername),
      string_traits: _.isEmpty(resTraits?.data?.string_traits)
        ? null
        : resTraits.data.string_traits,
      numeric_traits: _.isEmpty(resTraits?.data?.numeric_traits)
        ? null
        : resTraits.data.numeric_traits,
      total_supply: r.data.info.statistics.totalSupply,
      total_volume: r.data.info.statistics.totalVolume.unit,
      floor_price: r.data.info.statistics.floorPrice.unit,
      owners_count: r.data.info.statistics.numOwners,
      checked_tarits: true,
      is_trending: false
    }

    await pendings.savePending(body.contract_address)

    await sequelize.models.collections.create(body)

    return {
      status: 200,
      content: {
        saved: true,
        collectionData: body
      }
    }
  } catch (e) {
    return {
      statusCode: 400,
      data: null,
      error: e.message
    }
  }
}

const getTraits = async (collection) => {
  try {
    let apiKey = await sequelize.models.configurations.findOne({
      where: {
        key: 'ModuleNftApiKey'
      }
    })

    apiKey = _.isEmpty(apiKey) ? null : apiKey?.value

    if (!_.isEmpty(collection)) {
      const r = await axios({
        method: 'get',
        url: `${process.env.MODULE_NFT_BASEURL}/opensea/collection/traits?type=${collection}`,
        headers: {
          'X-API-KEY': apiKey
        }
      })

      if (r.status !== 200) throw new Error("Can't get traits")

      if (r.data.error !== null) throw new Error("Can't get traits")

      const traits =
        r.data.info?.numericTraits.length === 0
          ? {
              string_traits: r.data.info.stringTraits,
              numeric_traits: null
            }
          : {
              string_traits: r.data.info.stringTraits,
              numeric_traits: r.data.info.numeric_traits
            }

      return {
        isSuccess: true,
        data: traits
      }
    }

    const findedCollections = await sequelize.models.collections.findAll({
      where: {
        [Op.and]: [
          { string_traits: null },
          { numeric_traits: null },
          { checked_tarits: false }
        ]
      }
    })

    for (const entity of findedCollections) {
      try {
        const r = await axios({
          method: 'get',
          url: `${process.env.MODULE_NFT_BASEURL}/opensea/collection/traits?type=${entity.contract_address}`,
          headers: {
            'X-API-KEY': apiKey
          }
        })

        if (r.status !== 200) continue

        if (r.data.error !== null) continue

        const body =
          r.data.info?.numericTraits.length === 0
            ? {
                string_traits: r.data.info.stringTraits,
                checked_tarits: true
              }
            : {
                string_traits: r.data.info.stringTraits,
                numeric_traits: r.data.info.numeric_traits,
                checked_tarits: true
              }

        await sequelize.models.collections.update(body, {
          where: {
            contract_address: entity.contract_address
          }
        })
      } catch {
        continue
      }
    }
  } catch (e) {
    console.log(e)
    return {
      isSuccess: false,
      message: e.message
    }
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

    if (_.isEmpty(r?.data?.data))
      throw new Error("Can't find trending collections")

    for (const entity of r?.data?.data) {
      const data = collectionStructure(
        entity?.contractAddress || null,
        entity?.slug,
        entity?.data?.name,
        getTimestampFromIsoTime(entity?.created_date),
        entity?.safelist_request_status === 'verified' ? true : false,
        null, // FLOOR PRICE
        entity?.data?.owner,
        entity?.totalSupply,
        entity?.dailyVolume,
        entity?.WeeklyVolume,
        entity?.allTimeVolume,
        entity?.data?.banner_image_url,
        entity?.data?.description,
        entity?.image_url,
        generateTwitterUrl(entity?.data?.twitter_username),
        entity?.data?.discord_url,
        entity?.data?.external_url,
        entity?.data?.telegram_url,
        generateInstagramUrl(entity?.data?.instagram_username)
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
  } catch (e) {
    console.log(e)
  }
}

module.exports = { getTrendings, getTraits, getCollectionInfo }
