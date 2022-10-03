const axios = require('axios')
const { sequelize } = require('../../models')
const { pendings } = require('../collections')
const { Op } = require('sequelize')
const _ = require('lodash')
require('dotenv').config()
const { delay, database } = require('../../utils')
const BATCH_INFO_BASE_URL = `${process.env.MODULE_NFT_BASEURL}/opensea/collection/batchInfo?`

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
      url: `${process.env.MODULE_NFT_BASEURL}/opensea/collection/rankings?sort_by=ONE_DAY_VOLUME&count=100`,
      headers: {
        'X-API-KEY': apiKey
      }
    })

    if (_.isEmpty(r?.data?.rankings))
      throw new Error("Can't find trending collections")

    const data = []
    for (const entity of r.data.rankings)
      data.push(
        collectionStructure(
          entity?.collection_address || null,
          entity?.collection_slug,
          entity?.collection_name,
          getTimestampFromIsoTime(entity?.collection_creation_date),
          entity?.verified,
          entity?.statistics.floor,
          entity?.statistics.ownersCount,
          entity?.statistics.totalSupply,
          entity?.statistics.oneDayVolume,
          entity?.statistics.sevenDayVolume,
          null,
          null,
          null,
          entity?.logo_url,
          null,
          null,
          null,
          null,
          null
        )
      )

    let numberOfContracts = 0
    let contracts = 'type='
    let batchCollection = []
    let requestNumber = 0
    for (const entity of data) {
      if (data.length < 26) {
        contracts += `${entity.collection_slug}&type=`
        numberOfContracts++
        if (numberOfContracts === data.length) {
          const resAxios = await axios({
            method: 'get',
            url: BATCH_INFO_BASE_URL + contracts,
            headers: {
              'X-API-KEY': apiKey
            }
          })
          batchCollection.push(resAxios)
        }
      } else {
        contracts += `${entity.collection_slug}&type=`
        numberOfContracts++
        if (numberOfContracts > 25) {
          if (requestNumber > 2) {
            await delay.wait(2500)
            requestNumber = 0
          }
          requestNumber += 1
          contracts = contracts.substring(0, contracts.length - 6)
          numberOfContracts = 0
          const resAxios = axios({
            method: 'get',
            url: BATCH_INFO_BASE_URL + contracts,
            headers: {
              'X-API-KEY': apiKey
            }
          })
          contracts = 'type='
          batchCollection.push(resAxios)
        }
      }
    }

    batchCollection = await Promise.all(batchCollection)

    let newData = []

    for (const entity of batchCollection) {
      newData.push(...entity.data)
    }

    for (const collection of newData)
      for (const entity of data) {
        if (collection?.info?.slug !== entity.collection_slug) continue
        if (collection?.error !== null) continue

        const body = collectionStructure(
          collection.info.contractAddress,
          entity.collection_slug,
          entity.collection_name,
          entity.collection_creation_date,
          entity.verified,
          entity.floor_price,
          entity.owners_count,
          entity.total_supply,
          entity.one_day_volume,
          entity.seven_day_volume,
          collection?.info?.statistics?.totalVolume?.unit,
          collection?.info?.bannerImageUrl,
          collection?.info?.description,
          entity?.image_url,
          generateTwitterUrl(collection?.info?.twitterUsername),
          collection?.info?.discordUrl,
          collection?.info?.externalUrl,
          collection?.info?.telegramUrl,
          generateInstagramUrl(collection?.info?.instagramUsername)
        )
        database
          .upsert(
            body,
            {
              contract_address: collection.info.contractAddress
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
