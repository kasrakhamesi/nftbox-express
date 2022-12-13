const TIME = {
  MINUTE: {
    ONE: 1000 * 60 * 1,
    TWO: 1000 * 60 * 2,
    FIVE: 1000 * 60 * 5,
    TEN: 1000 * 60 * 5,
    FIFTEEN: 1000 * 60 * 15,
    THIRTY: 1000 * 60 * 30
  },
  HOUR: {
    ONE: 1000 * 60 * 60 * 1,
    TWO: 1000 * 60 * 60 * 2,
    SIX: 1000 * 60 * 60 * 6,
    TWELVE: 1000 * 60 * 60 * 12
  },
  DAY: {
    ONE: 1000 * 60 * 60 * 24 * 1,
    TWO: 1000 * 60 * 60 * 24 * 2,
    SEVEN: 1000 * 60 * 60 * 24 * 7,
    FOURTEEN: 1000 * 60 * 60 * 24 * 14
  }
}

const generateChangePercent = (a, b) => {
  const changePercent = String(parseFloat((a / b) * 100).toFixed(3)) + ' %'
  const newChangePercent = changePercent.toLowerCase().includes('nan')
    ? '0 %'
    : changePercent.toLowerCase().includes('inf')
    ? '0 %'
    : changePercent

  return newChangePercent
}

module.exports.calculate = async (contractAddress, collectionId, data) => {
  try {
    const timeframe = {
      _1min: {
        count: null,
        price: null
      },
      _2min: {
        count: null,
        price: null
      },
      _5min: {
        count: null,
        price: null
      },
      _10min: {
        count: null,
        price: null
      },
      _15min: {
        count: null,
        price: null
      },
      _30min: {
        count: null,
        price: null
      },
      _1hour: {
        count: null,
        price: null
      },
      _2hour: {
        count: null,
        price: null
      },
      _6hour: {
        count: null,
        price: null
      },
      _12hour: {
        count: null,
        price: null
      },
      _1day: {
        count: null,
        price: null
      },
      _2day: {
        count: null,
        price: null
      },
      _7day: {
        count: null,
        price: null
      },
      _14day: {
        count: null,
        price: null
      }
    }
    for (const item of data) {
      if (Date.now() - TIME.MINUTE.ONE <= item.timestamp) {
        timeframe._1min.count += parseInt(item.amount)
        timeframe._1min.price += parseFloat(item.price)
      } else if (Date.now() - TIME.MINUTE.TWO <= item.timestamp) {
        timeframe._2min.count += parseInt(item.amount)
        timeframe._2min.price += parseFloat(item.price)
      } else if (Date.now() - TIME.MINUTE.FIVE <= item.timestamp) {
        timeframe._5min.count += parseInt(item.amount)
        timeframe._5min.price += parseFloat(item.price)
      } else if (Date.now() - TIME.MINUTE.TEN <= item.timestamp) {
        timeframe._10min.count += parseInt(item.amount)
        timeframe._10min.price += parseFloat(item.price)
      } else if (Date.now() - TIME.MINUTE.FIFTEEN <= item.timestamp) {
        timeframe._15min.count += parseInt(item.amount)
        timeframe._15min.price += parseFloat(item.price)
      } else if (Date.now() - TIME.MINUTE.THIRTY <= item.timestamp) {
        timeframe._30min.count += parseInt(item.amount)
        timeframe._30min.price += parseFloat(item.price)
      } else if (Date.now() - TIME.HOUR.ONE <= item.timestamp) {
        timeframe._1hour.count += parseInt(item.amount)
        timeframe._1hour.price += parseFloat(item.price)
      } else if (Date.now() - TIME.HOUR.TWO <= item.timestamp) {
        timeframe._2hour.count += parseInt(item.amount)
        timeframe._2hour.price += parseFloat(item.price)
      } else if (Date.now() - TIME.HOUR.SIX <= item.timestamp) {
        timeframe._6hour.count += parseInt(item.amount)
        timeframe._6hour.price += parseFloat(item.price)
      } else if (Date.now() - TIME.HOUR.TWELVE <= item.timestamp) {
        timeframe._12hour.count += parseInt(item.amount)
        timeframe._12hour.price += parseFloat(item.price)
      } else if (Date.now() - TIME.DAY.ONE <= item.timestamp) {
        timeframe._1day.count += parseInt(item.amount)
        timeframe._1day.price += parseFloat(item.price)
      } else if (Date.now() - TIME.DAY.TWO <= item.timestamp) {
        timeframe._2day.count += parseInt(item.amount)
        timeframe._2day.price += parseFloat(item.price)
      } else if (Date.now() - TIME.DAY.SEVEN <= item.timestamp) {
        timeframe._7day.count += parseInt(item.amount)
        timeframe._7day.price += parseFloat(item.price)
      } else if (Date.now() - TIME.DAY.FOURTEEN <= item.timestamp) {
        timeframe._14day.count += parseInt(item.amount)
        timeframe._14day.price += parseFloat(item.price)
      }
    }

    const changePercent = {
      _1min: {
        count: generateChangePercent(
          timeframe._1min.count,
          timeframe._2min.count
        ),
        price: generateChangePercent(
          timeframe._1min.price,
          timeframe._2min.price
        )
      },
      _5min: {
        count: generateChangePercent(
          timeframe._5min.count,
          timeframe._10min.count
        ),
        price: generateChangePercent(
          timeframe._5min.price,
          timeframe._10min.price
        )
      },
      _15min: {
        count: generateChangePercent(
          timeframe._15min.count,
          timeframe._30min.count
        ),
        price: generateChangePercent(
          timeframe._15min.price,
          timeframe._30min.price
        )
      },
      _1hour: {
        count: generateChangePercent(
          timeframe._1hour.count,
          timeframe._2hour.count
        ),
        price: generateChangePercent(
          timeframe._1hour.price,
          timeframe._2hour.price
        )
      },
      _6hour: {
        count: generateChangePercent(
          timeframe._6hour.count,
          timeframe._12hour.count
        ),
        price: generateChangePercent(
          timeframe._6hour.price,
          timeframe._12hour.price
        )
      },
      _12hour: {
        count: generateChangePercent(
          timeframe._12hour.count,
          timeframe._1day.count
        ),
        price: generateChangePercent(
          timeframe._12hour.price,
          timeframe._1day.price
        )
      },
      _1day: {
        count: generateChangePercent(
          timeframe._1day.count,
          timeframe._2day.count
        ),
        price: generateChangePercent(
          timeframe._1day.price,
          timeframe._2day.price
        )
      },
      _7day: {
        count: generateChangePercent(
          timeframe._7day.count,
          timeframe._14day.count
        ),
        price: generateChangePercent(
          timeframe._7day.price,
          timeframe._14day.price
        )
      }
    }

    return {
      isSuccess: true,
      data: {
        sales: {
          count: salesStructure(contractAddress, timeframe),
          changePercent: changePercentSaleStructure(collectionId, changePercent)
        },
        volume: {
          count: volumeStructure(contractAddress, timeframe),
          changePercent: changePercentVolumeStructure(
            collectionId,
            changePercent
          )
        }
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

const salesStructure = (contractAddress, data) => {
  return {
    contract_address: contractAddress,
    [`one_minute_sales`]: data._1min.count,
    [`five_minute_sales`]: data._5min.count,
    [`fifteen_minute_sales`]: data._15min.count,
    [`one_hour_sales`]: data._1hour.count,
    [`six_hour_sales`]: data._6hour.count,
    [`twelve_hour_sales`]: data._12hour.count,
    [`one_day_sales`]: data._1day.count,
    [`seven_day_sales`]: data._7day.count
  }
}

const volumeStructure = (contractAddress, data) => {
  return {
    contract_address: contractAddress,
    [`one_minute_volume`]: data._1min.price,
    [`five_minute_volume`]: data._5min.price,
    [`fifteen_minute_volume`]: data._15min.price,
    [`one_hour_volume`]: data._1hour.price,
    [`six_hour_volume`]: data._6hour.price,
    [`twelve_hour_volume`]: data._12hour.price,
    [`one_day_volume`]: data._1day.price,
    [`seven_day_volume`]: data._7day.price
  }
}

const changePercentVolumeStructure = (collectionId, changePercent) => {
  return {
    collectionId,
    [`one_minute_volume_change_percent`]: changePercent._1min.price,
    [`five_minute_volume_change_percent`]: changePercent._5min.price,
    [`fifteen_minute_volume_change_percent`]: changePercent._15min.price,
    [`one_hour_volume_change_percent`]: changePercent._1hour.price,
    [`six_hour_volume_change_percent`]: changePercent._6hour.price,
    [`twelve_hour_volume_change_percent`]: changePercent._12hour.price,
    [`one_day_volume_change_percent`]: changePercent._1day.price,
    [`seven_day_volume_change_percent`]: changePercent._7day.price
  }
}

const changePercentSaleStructure = (collectionId, changePercent) => {
  return {
    collectionId,
    [`one_minute_sales_change_percent`]: changePercent._1min.count,
    [`five_minute_sales_change_percent`]: changePercent._5min.count,
    [`fifteen_minute_sales_change_percent`]: changePercent._15min.count,
    [`one_hour_sales_change_percent`]: changePercent._1hour.count,
    [`six_hour_sales_change_percent`]: changePercent._6hour.count,
    [`twelve_hour_sales_change_percent`]: changePercent._12hour.count,
    [`one_day_sales_change_percent`]: changePercent._1day.count,
    [`seven_day_sales_change_percent`]: changePercent._7day.count
  }
}
