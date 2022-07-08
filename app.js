const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const routes = {}
app.use(cors())

const _ = require('lodash')
routes.v1 = require('./app/v1/routes')

const qq = require('./app/v1/services/opensea')
//qq.floor().then(console.log).catch(console.log)

app.use('/v1', routes.v1)

//getData('azuki').then(console.log).catch(console.log)

const axios = require('axios')

const retriveNewCollection = async (contract_address) => {
    try {
        const url = `https://api.modulenft.xyz/api/v1/opensea/listings/new-listings?type=${contract_address}`
        const resListings = await axios({
            method: 'get',
            url: url,
            headers: {
                'X-API-KEY':
                    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNzg3MTI5OTk0NTc1ODcyMDMwIiwiaWF0IjoxNjQ5OTcwODYzLCJleHAiOjE2NTExODA0NjN9.at3sJslxEanZM_XfHxJTlFdodCPzm8s1hd9yIUF15LZwQKlohuQx8jT_xRE3CllmsNt5NK-zzLwhXqy66AvwQ3F74c8NX09O--LQub6U3eNK8DKjJzs1R1Nj9jq-qaekBjF3ZkT_uKPpaCvVVq9RqtND1QO8ZoI8P40rLnAxPjQuiL4pH3wuSR9PC__Pt4OPaKqGKcIhcEVRqfVMjXwuIuBEMuyqFCZInKNWfRJyqXIOwKzXcsGSvZFhEhXpFuBE5-LKOqRmIce7ha_ZM3ewZiuAmkBo33BeAlt00pmcpJZmz49oc0gNPh2sxxQ5CoDVRR7oA-GBkcBsmN6EkyIvXQ',
                'x-bypass-cache': 'true'
            }
        })
        if (resListings?.data?.error !== null)
            return {
                status: 200,
                content: { listings: resListings?.data?.listings }
            }
    } catch (e) {
        return {
            status: 400,
            content: { message: e.message }
        }
    }
}

const retriveTopCollections = async (numberOfTop = 100) => {
    const url = `https://api.modulenft.xyz/api/v1/opensea/listings/listings?type=${contract_address}`
    const res = await axios({
        method: 'get',
        url: url,
        headers: {
            'X-API-KEY':
                'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNzg3MTI5OTk0NTc1ODcyMDMwIiwiaWF0IjoxNjQ5OTcwODYzLCJleHAiOjE2NTExODA0NjN9.at3sJslxEanZM_XfHxJTlFdodCPzm8s1hd9yIUF15LZwQKlohuQx8jT_xRE3CllmsNt5NK-zzLwhXqy66AvwQ3F74c8NX09O--LQub6U3eNK8DKjJzs1R1Nj9jq-qaekBjF3ZkT_uKPpaCvVVq9RqtND1QO8ZoI8P40rLnAxPjQuiL4pH3wuSR9PC__Pt4OPaKqGKcIhcEVRqfVMjXwuIuBEMuyqFCZInKNWfRJyqXIOwKzXcsGSvZFhEhXpFuBE5-LKOqRmIce7ha_ZM3ewZiuAmkBo33BeAlt00pmcpJZmz49oc0gNPh2sxxQ5CoDVRR7oA-GBkcBsmN6EkyIvXQ',
            'x-bypass-cache': 'true'
        }
    })
    return res
}

const retriveListings = async (contract_address) => {
    const url = `https://api.modulenft.xyz/api/v1/opensea/listings/listings?type=${contract_address}`
    const res = await axios({
        method: 'get',
        url: url,
        headers: {
            'X-API-KEY':
                'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNzg3MTI5OTk0NTc1ODcyMDMwIiwiaWF0IjoxNjQ5OTcwODYzLCJleHAiOjE2NTExODA0NjN9.at3sJslxEanZM_XfHxJTlFdodCPzm8s1hd9yIUF15LZwQKlohuQx8jT_xRE3CllmsNt5NK-zzLwhXqy66AvwQ3F74c8NX09O--LQub6U3eNK8DKjJzs1R1Nj9jq-qaekBjF3ZkT_uKPpaCvVVq9RqtND1QO8ZoI8P40rLnAxPjQuiL4pH3wuSR9PC__Pt4OPaKqGKcIhcEVRqfVMjXwuIuBEMuyqFCZInKNWfRJyqXIOwKzXcsGSvZFhEhXpFuBE5-LKOqRmIce7ha_ZM3ewZiuAmkBo33BeAlt00pmcpJZmz49oc0gNPh2sxxQ5CoDVRR7oA-GBkcBsmN6EkyIvXQ',
            'x-bypass-cache': 'true'
        }
    })
    return res
}

//Bere Samte KarBar

const retriveOrders = async (contract_address) => {
    // const url = `https://api.modulenft.xyz/api/v1/opensea/orders/sales?type=${contract_address}&count=30`
    const url =
        'https://cyberbabies.io/api/rarityTool/cloudFetch/0x60e4d786628fea6478f785a6d7e704777c86a7c6?totalSupply=19052&minTokenId=1'
    const res = await axios({
        method: 'get',
        url: url,
        headers: {
            'X-API-KEY':
                'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNzg3MTI5OTk0NTc1ODcyMDMwIiwiaWF0IjoxNjQ5OTcwODYzLCJleHAiOjE2NTExODA0NjN9.at3sJslxEanZM_XfHxJTlFdodCPzm8s1hd9yIUF15LZwQKlohuQx8jT_xRE3CllmsNt5NK-zzLwhXqy66AvwQ3F74c8NX09O--LQub6U3eNK8DKjJzs1R1Nj9jq-qaekBjF3ZkT_uKPpaCvVVq9RqtND1QO8ZoI8P40rLnAxPjQuiL4pH3wuSR9PC__Pt4OPaKqGKcIhcEVRqfVMjXwuIuBEMuyqFCZInKNWfRJyqXIOwKzXcsGSvZFhEhXpFuBE5-LKOqRmIce7ha_ZM3ewZiuAmkBo33BeAlt00pmcpJZmz49oc0gNPh2sxxQ5CoDVRR7oA-GBkcBsmN6EkyIvXQ',
            'x-bypass-cache': 'true'
        }
    })
    return res
}

/* Bere Samte KarBar
const retriveOrders = async (contract_address) => {
    const url = `https://api.modulenft.xyz/api/v1/opensea/orders/sales?type=${contract_address}&count=30`
    const res = await axios({
        method: 'get',
        url: url,
        headers: {
            'X-API-KEY':
                'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNzg3MTI5OTk0NTc1ODcyMDMwIiwiaWF0IjoxNjQ5OTcwODYzLCJleHAiOjE2NTExODA0NjN9.at3sJslxEanZM_XfHxJTlFdodCPzm8s1hd9yIUF15LZwQKlohuQx8jT_xRE3CllmsNt5NK-zzLwhXqy66AvwQ3F74c8NX09O--LQub6U3eNK8DKjJzs1R1Nj9jq-qaekBjF3ZkT_uKPpaCvVVq9RqtND1QO8ZoI8P40rLnAxPjQuiL4pH3wuSR9PC__Pt4OPaKqGKcIhcEVRqfVMjXwuIuBEMuyqFCZInKNWfRJyqXIOwKzXcsGSvZFhEhXpFuBE5-LKOqRmIce7ha_ZM3ewZiuAmkBo33BeAlt00pmcpJZmz49oc0gNPh2sxxQ5CoDVRR7oA-GBkcBsmN6EkyIvXQ',
            'x-bypass-cache': 'true'
        }
    })
    return res
}
*/

const retriveMetaData = async () => {
    try {
        const q = `https://api.modulenft.xyz/api/v1/metadata/metadata?contractAddress=0xed5af388653567af2f388e6224dc7c4b3241c544&tokenId=1%26tokenId%3D2%26tokenId%3D3%26tokenId%3D4%26tokenId%3D5`
    } catch (e) {
        return e
    }
}

const Model = require('./app/v1/models').sequelize
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

class CollectionsAndTokens {
    #contractAddress
    constructor(contractAddress) {
        this.#contractAddress = contractAddress
    }
    init = async () => {
        const collections = await this.retriveCollections(this.#contractAddress)
        if (collections.status !== 200) return collections
        const tokens = await this.retriveTokens(
            collections.content.id,
            collections.content.total_supply
        )
    }
    retriveTokens = async (collectionId, totalSupply) => {
        try {
            let tokensList = []
            let numberOfRequest = 1
            let offset = 0
            while (offset <= totalSupply) {
                try {
                    if (numberOfRequest === 4) {
                        await delay(1500)
                        numberOfRequest = 1
                    }
                    numberOfRequest++
                    offset += 100
                    console.log(offset)
                    const url = `https://api.modulenft.xyz/api/v1/opensea/collection/tokens?type=${
                        this.#contractAddress
                    }&count=100&offset=${offset}&traits=`
                    const res = axios({
                        method: 'get',
                        url: url,
                        headers: {
                            'X-API-KEY':
                                'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNzg3MTI5OTk0NTc1ODcyMDMwIiwiaWF0IjoxNjQ5OTcwODYzLCJleHAiOjE2NTExODA0NjN9.at3sJslxEanZM_XfHxJTlFdodCPzm8s1hd9yIUF15LZwQKlohuQx8jT_xRE3CllmsNt5NK-zzLwhXqy66AvwQ3F74c8NX09O--LQub6U3eNK8DKjJzs1R1Nj9jq-qaekBjF3ZkT_uKPpaCvVVq9RqtND1QO8ZoI8P40rLnAxPjQuiL4pH3wuSR9PC__Pt4OPaKqGKcIhcEVRqfVMjXwuIuBEMuyqFCZInKNWfRJyqXIOwKzXcsGSvZFhEhXpFuBE5-LKOqRmIce7ha_ZM3ewZiuAmkBo33BeAlt00pmcpJZmz49oc0gNPh2sxxQ5CoDVRR7oA-GBkcBsmN6EkyIvXQ'
                        }
                    })
                    tokensList.push(res)
                } catch (e) {
                    offset--
                    console.log(e)
                    continue
                }
            }

            const tokens = await Promise.all(tokensList)
            for (let i = 0; i < tokens.length; i++) {
                if (tokens[i].status !== 200) continue
                const tokensData = tokens[i].data.tokens
                for (let k = 0; k < tokensData.length; k++) {
                    try {
                        await datas.push({ tokenId: tokensData[k].tokenId })
                        /*
                        Model.models.tokens
                            .create({
                                collectionId: collectionId,
                                token_id: tokensData[k].tokenId,
                                token_image: tokensData[k].image_url
                            })
                            .then(console.log)
                            .catch((e) => {
                                console.log(
                                    '-----------------------------------'
                                )

                                console.log(e.message)

                                console.log(tokensData[k])

                                console.log(
                                    '-----------------------------------'
                                )
                            })
                            */
                    } catch {
                        continue
                    }
                }
            }

            require('fs').appendFileSync(
                'data.json',
                JSON.stringify(datas),
                function (err) {
                    if (err) throw err
                    console.log('Saved!')
                }
            )

            require('fs').appendFileSync('data2.json', datas, function (err) {
                if (err) throw err
                console.log('Saved!')
            })
        } catch (e) {
            console.log(e)
        }
    }
    retriveCollections = async () => {
        try {
            if (!String(this.#contractAddress).includes('0x'))
                throw new Error('invalid contract address')

            const resFindContract = await Model.models.collections.findOne({
                where: {
                    contract_address: this.#contractAddress
                }
            })

            if (!_.isEmpty(resFindContract)) {
                return {
                    status: 200,
                    content: {
                        id: resFindContract?.id,
                        total_supply: resFindContract?.total_supply,
                        collection_name: resFindContract?.contract_name,
                        tratis: JSON.parse(resFindContract?.traits)
                    }
                }
            }

            const res = await axios.get(
                `${
                    process.env.MODULE_NFT_BASEURL
                }/opensea/collection/traits?type=${this.#contractAddress}`
            )

            if (res?.data?.error !== null) throw new Error(res?.data?.error)

            const resCollectionInfo = await axios.get(
                `${
                    process.env.MODULE_NFT_BASEURL
                }/opensea/collection/info?type=${this.#contractAddress}`
            )

            if (resCollectionInfo?.data?.error !== null)
                throw new Error(resCollectionInfo?.data?.error)

            const data = {
                total_supply: parseInt(
                    resCollectionInfo?.data?.info?.statistics?.totalSupply
                ),
                contract_address: this.#contractAddress,
                collection_name: res?.data?.collection,
                traits: res?.data?.info?.stringTraits
            }

            const resCreateCollections = await Model.models.collections.create(
                data
            )

            return {
                status: 200,
                content: {
                    id: resCreateCollections.id,
                    total_supply: parseInt(
                        resCollectionInfo?.data?.info?.statistics?.totalSupply
                    ),
                    collection_name: res?.data?.collection,
                    tratis: res?.data?.info?.stringTraits
                }
            }
        } catch (e) {
            return {
                status: 400,
                content: { message: e.message }
            }
        }
    }
}
/*
retriveTokensFromCollection = async (contractAddress, offset = 0) => {
    try {
        let pushesh = []
        let num = 1
        while (offset < 5) {
            try {
                if (num === 9) {
                    await delay(1500)
                    num = 1
                }
                num++
                console.log(offset)
                offset++
                const url = `https://api.modulenft.xyz/api/v1/opensea/collection/tokens?type=${contractAddress}&count=100&offset=${offset}&traits=`
                const res = axios({
                    method: 'get',
                    url: url,
                    headers: {
                        'X-API-KEY':
                            'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNzg3MTI5OTk0NTc1ODcyMDMwIiwiaWF0IjoxNjQ5OTcwODYzLCJleHAiOjE2NTExODA0NjN9.at3sJslxEanZM_XfHxJTlFdodCPzm8s1hd9yIUF15LZwQKlohuQx8jT_xRE3CllmsNt5NK-zzLwhXqy66AvwQ3F74c8NX09O--LQub6U3eNK8DKjJzs1R1Nj9jq-qaekBjF3ZkT_uKPpaCvVVq9RqtND1QO8ZoI8P40rLnAxPjQuiL4pH3wuSR9PC__Pt4OPaKqGKcIhcEVRqfVMjXwuIuBEMuyqFCZInKNWfRJyqXIOwKzXcsGSvZFhEhXpFuBE5-LKOqRmIce7ha_ZM3ewZiuAmkBo33BeAlt00pmcpJZmz49oc0gNPh2sxxQ5CoDVRR7oA-GBkcBsmN6EkyIvXQ'
                    }
                })
                pushesh.push(res)
            } catch (e) {
                console.log(e)
                continue
            }
        }

        let q = await Promise.all(pushesh)
        let tokenIds = []
        for (let i = 0; i < q.length; i++) {
            tokenIds.push(q[i].data.tokens)
        }

        sequelize.models.collections
            .create({
                contract_address: contractAddress,
                total_supply: 100,
                traits: JSON.stringify(tokenIds)
            })
            .then(console.log)
            .catch(console.log)

        /*
        let count = 1
        let tokenIds = []
        let countAll = 0
        while (count !== 0) {
            try {
                console.log(offset, count, countAll)
                const url = `https://api.modulenft.xyz/api/v1/opensea/collection/tokens?type=${contractAddress}&count=100&offset=${offset}&traits=`
                offset++
                const res = await axios({
                    method: 'get',
                    url: url,
                    headers: {
                        'X-API-KEY':
                            'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNzg3MTI5OTk0NTc1ODcyMDMwIiwiaWF0IjoxNjQ5OTcwODYzLCJleHAiOjE2NTExODA0NjN9.at3sJslxEanZM_XfHxJTlFdodCPzm8s1hd9yIUF15LZwQKlohuQx8jT_xRE3CllmsNt5NK-zzLwhXqy66AvwQ3F74c8NX09O--LQub6U3eNK8DKjJzs1R1Nj9jq-qaekBjF3ZkT_uKPpaCvVVq9RqtND1QO8ZoI8P40rLnAxPjQuiL4pH3wuSR9PC__Pt4OPaKqGKcIhcEVRqfVMjXwuIuBEMuyqFCZInKNWfRJyqXIOwKzXcsGSvZFhEhXpFuBE5-LKOqRmIce7ha_ZM3ewZiuAmkBo33BeAlt00pmcpJZmz49oc0gNPh2sxxQ5CoDVRR7oA-GBkcBsmN6EkyIvXQ'
                    }
                })

                if (res.status !== 200) {
                    offset--
                    continue
                }

                count = res.data.count
                countAll += count
                tokenIds.push(res.data.tokens)

                // console.log(tokenIds)
            } catch (e) {
                console.log(e)
                offset--
                continue
            }
        }
        sequelize.models.collections
            .create({
                contract_address: contractAddress,
                total_supply: 100,
                traits: JSON.stringify(tokenIds),
                token_ids: JSON.stringify(tokenIds)
            })
            .then(console.log)
            .catch(console.log)
        
    } catch (e) {
        console.log(e)
    }
}

*/
/*
const are = new CollectionsAndTokens(
    '0x3035bb5fdd9597903776da28e41614e1b2ca39bc'
)
are.init().then(console.log).catch(console.log)
*/
/*
retriveTokensFromCollection('0x3035bb5fdd9597903776da28e41614e1b2ca39bc')
    .then(console.log)
    .catch(console.log)
*/

// replace with your Alchemy api key

const apiKey = 'c8XCRD_56zo2QvYijbbPfaw6AgZ9X-e0'
const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTsForCollection`
const contractAddr = '0x3035bb5fdd9597903776da28e41614e1b2ca39bc'

async function callGetNFTsForCollectionOnce(startToken = '') {
    const url = `${baseURL}/?contractAddress=${contractAddr}&startToken=${startToken}&withMetadata=true`
    const response = await axios.get(url)
    console.log(parseInt(response.data?.nextToken, 16))
    return response.data
}

async function AReDG() {
    let startToken = ''
    let hasNextPage = true
    totalNftsFound = 0
    while (hasNextPage) {
        const { nfts, nextToken } = await callGetNFTsForCollectionOnce(
            startToken
        )
        if (!nextToken) {
            // When nextToken is not present, then there are no more NFTs to fetch.
            hasNextPage = false
        }
        startToken = nextToken
        totalNftsFound += nfts.length
    }
}

class TrendingCollections {
    getTopCollectionsForRarity = async (numberOfTrending = 500) => {
        try {
            numberOfTrending = parseInt(numberOfTrending)

            let offset = (totalOffset = 0)
            let count = 100

            let apiKey = Model.models.configurations.findOne({
                where: {
                    key: 'ModuleNftApiKey'
                }
            })

            apiKey = _.isEmpty(apiKey) ? null : apiKey?.value

            if (numberOfTrending <= 100) count = numberOfTrending
            else {
                totalOffset = numberOfTrending / 100
            }

            const promisesCollections = []
            while (offset <= totalOffset) {
                const url = `${process.env.MODULE_NFT_BASEURL}/opensea/collection/rankings?sort_by=ONE_DAY_VOLUME&count=${count}&offset=${offset}`
                const getTopCollection = new axios({
                    method: 'get',
                    url: url,
                    headers: {
                        'X-API-KEY': apiKey
                    }
                })
                offset++
                promisesCollections.push(getTopCollection)
            }

            const resOurContracts = await Model.models.collections.findAll()

            const collectionsRequests = await Promise.all(promisesCollections)

            const resTraits = await this.getTraitsFromContractAddress(
                contractAddress,
                apiKey
            )

            const collectionsData = collectionsRequests
                .filter(
                    (item) => item.status === 200 && item.data.error === null
                )
                .map((item) => {
                    return item.data.rankings.map((item) => {
                        return {
                            collection_slug: item.collection_slug,
                            collection_name: item.collection_name,
                            collection_creation_date:
                                item.collection_creation_date,
                            verified: item.verified,
                            logo_url: item.logo_url,
                            floor: item.statistics.floor,
                            owners_count: item.statistics.ownersCount,
                            total_supply: item.statistics.totalSupply,
                            seven_day_volume: item.statistics.sevenDayVolume,
                            one_day_volume: item.statistics.oneDayVolume,
                            thirty_day_volume: item.statistics.thirtyDayVolume,
                            total_volume: item.statistics.totalVolume,
                            traits: JSON.stringify(resTraits)
                        }
                    })
                })

            const serializeCollectionsData = []
            for (let q = 0; q < collectionsData.length; q++) {
                try {
                    for (let z = 0; z < resOurContracts.length; z++) {
                        try {
                            if (
                                resOurContracts[z]?.collection_slug ===
                                collectionsData[q].collection_slug
                            ) {
                                serializeCollectionsData.push({
                                    collection_slug:
                                        collectionsData[q].collection_slug,
                                    collection_name:
                                        collectionsData[q].collection_name,
                                    collection_creation_date:
                                        collectionsData[q]
                                            .collection_creation_date,
                                    verified: collectionsData[q].verified,
                                    logo_url: collectionsData[q].logo_url,
                                    floor: collectionsData[q].statistics.floor,
                                    owners_count:
                                        collectionsData[q].statistics
                                            .ownersCount,
                                    total_supply:
                                        collectionsData[q].statistics
                                            .totalSupply,
                                    seven_day_volume:
                                        collectionsData[q].sevenDayVolume,
                                    one_day_volume:
                                        collectionsData[q].statistics
                                            .oneDayVolume,
                                    thirty_day_volume:
                                        collectionsData[q].statistics
                                            .thirtyDayVolume,
                                    total_volume:
                                        collectionsData[q].statistics
                                            .totalVolume,
                                    traits: collectionsData[q].traits
                                })
                            }
                        } catch (e) {
                            console.log(e)
                            continue
                        }
                    }
                } catch (e) {
                    console.log(e)
                    continue
                }
            }

            const resRetrieveBatchCollectionInfo =
                await this.retrieveBatchCollectionInfo(collectionsData)

            const collections = []

            for (let k = 0; k < collectionsData.length; k++) {
                for (let j = 0; j < collectionsData[k].length; j++) {
                    for (
                        let i = 0;
                        i < resRetrieveBatchCollectionInfo.length;
                        i++
                    ) {
                        if (
                            collectionsData[k][j].collection_slug ===
                            resRetrieveBatchCollectionInfo[i].collection_slug
                        ) {
                            collections.push({
                                collection_slug:
                                    collectionsData[k][j].collection_slug,
                                collection_name:
                                    collectionsData[k][j].collection_name,
                                collection_creation_date:
                                    collectionsData[k][j]
                                        .collection_creation_date,
                                verified: collectionsData[k][j].verified,
                                logo_url: collectionsData[k][j].logo_url,
                                floor: collectionsData[k][j].floor,
                                owners_count:
                                    collectionsData[k][j].owners_count,
                                total_supply:
                                    collectionsData[k][j].total_supply,
                                seven_day_volume:
                                    collectionsData[k][j].seven_day_volume,
                                one_day_volume:
                                    collectionsData[k][j].one_day_volume,
                                thirty_day_volume:
                                    collectionsData[k][j].thirty_day_volume,
                                total_volume:
                                    collectionsData[k][j].total_volume,
                                contract_address:
                                    resRetrieveBatchCollectionInfo[i]
                                        .contract_address,
                                banner_image_url:
                                    resRetrieveBatchCollectionInfo[i]
                                        .banner_image_url,
                                description:
                                    resRetrieveBatchCollectionInfo[i]
                                        .description,
                                image_url:
                                    resRetrieveBatchCollectionInfo[i].image_url,
                                twitter_url:
                                    resRetrieveBatchCollectionInfo[i]
                                        .twitter_url,
                                discord_url:
                                    resRetrieveBatchCollectionInfo[i]
                                        .discord_url,
                                website_url:
                                    resRetrieveBatchCollectionInfo[i]
                                        .website_url,
                                telegram_url:
                                    resRetrieveBatchCollectionInfo[i]
                                        .telegram_url,
                                instagram_url:
                                    resRetrieveBatchCollectionInfo[i]
                                        .instagram_url,
                                traits: JSON.stringify({ test: 'test' })
                            })
                        }
                    }
                }
            }

            const promises = await Promise.all(collections)

            for (let index = 0; index < promises.length; index++) {
                try {
                    await Model.models.collections.create(promises[index])
                } catch (e) {
                    console.log('index' + index)
                    console.log(promises[index])
                    console.log(e)
                }
            }

            // const res = await Model.models.collections.bulkCreate(promises)
        } catch (e) {
            console.log(e)
            return {
                status: 400,
                content: { message: e.message }
            }
        }
    }

    retrieveBatchCollectionInfo = async (collections) => {
        try {
            let apiKey = Model.models.configurations.findOne({
                where: {
                    key: 'ModuleNftApiKey'
                }
            })

            apiKey = _.isEmpty(apiKey) ? null : apiKey?.value

            if (collections.length <= 0) return

            let url = `${process.env.MODULE_NFT_BASEURL}/opensea/collection/batchInfo?`

            let payload = null

            let numberOfContracts = 0

            let resBatchCollectionInfo = []

            for (let k = 0; k < collections.length; k++) {
                try {
                    collections[k].map((item) => {
                        const contracts = `${item.collection_slug}&`

                        payload += `type=${contracts}`

                        numberOfContracts++

                        while (numberOfContracts > 50) {
                            numberOfContracts = 0
                            payload = payload
                                .substr(4, payload.length)
                                .slice(0, -1)
                            const res = axios({
                                method: 'get',
                                url: url + payload,
                                headers: {
                                    'X-API-KEY': apiKey
                                }
                            })
                            resBatchCollectionInfo.push(res)
                            payload = null
                        }
                    })
                } catch {
                    continue
                }
            }

            const collectionsPromises = await Promise.all(
                resBatchCollectionInfo
            )

            let collectionsData = []
            for (let k = 0; k < collectionsPromises.length; k++) {
                try {
                    if (collectionsPromises[k].status !== 200) {
                        console.log(collectionsPromises[k])
                        continue
                    }
                    collectionsPromises[k].data
                        .filter((item) => item.info.contractAddress !== null)
                        .map((item) => {
                            collectionsData.push({
                                collection_slug: item.info.slug,
                                contract_address: item.info.contractAddress,
                                banner_image_url: item.info.bannerImageUrl,
                                description: item.info.description,
                                image_url: item.info.imageUrl,
                                twitter_url: `https://twitter.com/${item.info.twitterUsername}`,
                                discord_url: item.info.discordUrl,
                                website_url: item.info.externalUrl,
                                telegram_url: item.info.telegramUrl,
                                instagram_url: `https://instagram.com/${item.info.instagramUsername}`
                            })
                        })
                } catch (e) {
                    console.log(e)
                    continue
                }
            }

            return await Promise.all(collectionsData)
        } catch (e) {
            console.log(e)
            return {
                status: 400,
                content: { message: e.message }
            }
        }
    }

    getTraitsFromContractAddress = async (contractAddress) => {
        try {
            return await axios.get(
                `${process.env.MODULE_NFT_BASEURL}/opensea/collection/traits?type=${contractAddress}`
            )
        } catch (e) {
            return {
                status: 400,
                content: { message: e.message }
            }
        }
    }
}

//co

//getTopCollectionsForRarity().then().catch(console.log)
/*
const getTokenIds = async(contractAddress,maxSupply) => {
    try {
        
        let lastOffset = maxSupply / 100
        let Offset = 0
        let data = []
        while (Offset < lastOffset)
        {
            if (Offset % 4 === 0)
            {
                await delay(1500)
            }
            const res = axios.get(`https://api.modulenft.xyz/api/v1/opensea/collection/tokens?type=${contractAddress}&count=100&offset=${Offset}`)
            Offset++
            data.push(res)
        }
        const q = await Promise.all(data)
        try {
            fs.writeFileSync('/Users/joe/test.txt', q.data.);
            // file written successfully
          } catch (err) {
            console.error(err);
          }
    }
    catch (e) { console.log(e) }
}
*/
/*
const { createAlchemyWeb3 } = require('@alch/alchemy-web3')

const yyy = async () => {
    // Replace with your Alchemy api key:
    //const apiKey2 = 'demo'

    // Initialize an alchemy-web3 instance:
    const web3 = createAlchemyWeb3(
        `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`
    )

    const data = await web3.alchemy.getAssetTransfers({
        fromBlock: '0x0',
        fromAddress: '0x3ed7fa13f1dd67ca282e9dea56bf335719979a48'
    })

    // Print response:
    console.log(data)
}
yyy().then(console.log).catch(console.log)
*/

const ca = '0x3035bb5fdd9597903776da28e41614e1b2ca39bc'
const areDgAziz = require('./app/v1/services/modulenft')

var myDate = new Date('2022-06-15T16:04:22')
var result = myDate.getTime()
console.log(result)

const ay = async () => {
    const query = new URLSearchParams({
        pageSize: '50',
        offset: '1000'
    }).toString()

    const chain = 'ETH'
    const address = '0x3035bb5fdd9597903776da28e41614e1b2ca39bc'
    const resp = await axios({
        method: 'get',
        url: `https://api-eu1.tatum.io/v3/nft/collection/${chain}/${address}?${query}`,
        headers: {
            'x-api-keyY': '3fa44a47-5ac8-4c02-8658-64ebdc0b5f6c'
        }
    })

    const data = await resp.data
    return data
}

//ye.init()
//const ye = new areDgAziz.loader.collections(ca)
//ye.saveCollection().then(console.log).catch(console.log)

// replace with your Alchemy api key

const tasks = require('./app/v1/tasks')
const { sequelize } = require('./app/v1/models')
//tasks.listings()
//tasks.stats()
//tasks.trending()
//tasks.traits()
tasks.tokenIds()

const yyy = async () => {
    await areDgAziz.trending.SaveTopCollections.init()

    const q = new areDgAziz.listings.GetListings(
        '0x1792a96e5668ad7c167ab804a100ce42395ce54d'
    )
    const q2 = await q.save()

    const o = new areDgAziz.orders.GetOrders(
        '0x1792a96e5668ad7c167ab804a100ce42395ce54d'
    )
    const o2 = await o.save()
}

//yyy().then(console.log).catch(console.log)

app.use('*', async (req, res) => {
    /*
    const arr = await sequelize.models.collections.findAll()
    return res.send(arr)
    */
    /*
    retriveOrders('0x3035bb5fdd9597903776da28e41614e1b2ca39bc')
        .then((r) => {
            return res.send(r.data)
        })
        .catch((e) => {
            return res.send(e)
        })
        */
    const qC = await ay()
    res.json(qC)
    //const ye = await areDgAziz.trending.SaveTopCollections.init()
    //res.status(ye.status).send(ye.content)
    //  res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(process.env.PORT)
