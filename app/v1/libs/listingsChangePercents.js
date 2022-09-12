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

module.exports.calculate = async (collectionId, data) => {
  try {
    const timeframe = {
      _1min: null,
      _2min: null,
      _5min: null,
      _10min: null,
      _15min: null,
      _30min: null,
      _1hour: null,
      _2hour: null,
      _6hour: null,
      _12hour: null,
      _1day: null,
      _2day: null,
      _7day: null,
      _14day: null
    }
    for (const item of data) {
      if (Date.now() - TIME.MINUTE.ONE <= item.timestamp) timeframe._1min++
      else if (Date.now() - TIME.MINUTE.TWO <= item.timestamp) timeframe._2min++
      else if (Date.now() - TIME.MINUTE.FIVE <= item.timestamp)
        timeframe._5min++
      else if (Date.now() - TIME.MINUTE.TEN <= item.timestamp)
        timeframe._10min++
      else if (Date.now() - TIME.MINUTE.FIFTEEN <= item.timestamp)
        timeframe._15min++
      else if (Date.now() - TIME.MINUTE.THIRTY <= item.timestamp)
        timeframe._30min++
      else if (Date.now() - TIME.HOUR.ONE <= item.timestamp) timeframe._1hour++
      else if (Date.now() - TIME.HOUR.TWO <= item.timestamp) timeframe._2hour++
      else if (Date.now() - TIME.HOUR.SIX <= item.timestamp) timeframe._6hour++
      else if (Date.now() - TIME.HOUR.TWELVE <= item.timestamp)
        timeframe._12hour++
      else if (Date.now() - TIME.DAY.ONE <= item.timestamp) timeframe._1day++
      else if (Date.now() - TIME.DAY.TWO <= item.timestamp) timeframe._2day++
      else if (Date.now() - TIME.DAY.SEVEN <= item.timestamp) timeframe._7day++
      else if (Date.now() - TIME.DAY.FOURTEEN <= item.timestamp)
        timeframe._14day++
    }

    let changePercent = {
      _1min:
        String(
          parseFloat((timeframe._1min / timeframe._2min) * 100).toFixed(3)
        ) + ' %',
      _5min:
        String(
          parseFloat((timeframe._5min / timeframe._10min) * 100).toFixed(3)
        ) + ' %',
      _15min:
        String(
          parseFloat((timeframe._15min / timeframe._30min) * 100).toFixed(3)
        ) + ' %',
      _1hour:
        String(
          parseFloat((timeframe._1hour / timeframe._2hour) * 100).toFixed(3)
        ) + ' %',
      _6hour:
        String(
          parseFloat((timeframe._6hour / timeframe._12hour) * 100).toFixed(3)
        ) + ' %',
      _12hour:
        String(
          parseFloat((timeframe._12hour / timeframe._1day) * 100).toFixed(3)
        ) + ' %',
      _1day:
        String(
          parseFloat((timeframe._1day / timeframe._2day) * 100).toFixed(3)
        ) + ' %',
      _7day:
        String(
          parseFloat((timeframe._7day / timeframe._14day) * 100).toFixed(3)
        ) + ' %'
    }

    changePercent = {
      _1min: changePercent._1min.toLowerCase().includes('nan')
        ? '0 %'
        : changePercent._1min.toLowerCase().includes('inf')
        ? '0 %'
        : changePercent._1min,

      _5min: changePercent._5min.toLowerCase().includes('nan')
        ? '0 %'
        : changePercent._5min.toLowerCase().includes('inf')
        ? '0 %'
        : changePercent._5min,
      _15min: changePercent._15min.toLowerCase().includes('nan')
        ? '0 %'
        : changePercent._15min.toLowerCase().includes('inf')
        ? '0 %'
        : changePercent._15min,
      _1hour: changePercent._1hour.toLowerCase().includes('nan')
        ? '0 %'
        : changePercent._1hour.toLowerCase().includes('inf')
        ? '0 %'
        : changePercent._1hour,
      _6hour: changePercent._6hour.toLowerCase().includes('nan')
        ? '0 %'
        : changePercent._6hour.toLowerCase().includes('inf')
        ? '0 %'
        : changePercent._6hour,
      _12hour: changePercent._12hour.toLowerCase().includes('nan')
        ? '0 %'
        : changePercent._12hour.toLowerCase().includes('inf')
        ? '0 %'
        : changePercent._12hour,
      _1day: changePercent._1day.toLowerCase().includes('nan')
        ? '0 %'
        : changePercent._1day.toLowerCase().includes('inf')
        ? '0 %'
        : changePercent._1day,
      _7day: changePercent._7day.toLowerCase().includes('nan')
        ? '0 %'
        : changePercent._7day.toLowerCase().includes('inf')
        ? '0 %'
        : changePercent._7day
    }

    return {
      isSuccess: true,
      data: {
        change: changeStructure(collectionId, timeframe),
        changePercent: changePercentStructure(collectionId, changePercent)
      }
    }
  } catch (e) {
    return {
      isSuccess: false,
      message: e.message
    }
  }
}

const changeStructure = (collectionId, change) => {
  return {
    collectionId,
    [`one_minute_listings`]: change._1min,
    [`five_minute_listings`]: change._5min,
    [`fifteen_minute_listings`]: change._15min,
    [`one_hour_listings`]: change._1hour,
    [`six_hour_listings`]: change._6hour,
    [`twelve_hour_listings`]: change._12hour,
    [`one_day_listings`]: change._1day,
    [`seven_day_listings`]: change._7day
  }
}

const changePercentStructure = (collectionId, changePercent) => {
  return {
    collectionId,
    [`one_minute_listings_change_percent`]: changePercent._1min,
    [`five_minute_listings_change_percent`]: changePercent._5min,
    [`fifteen_minute_listings_change_percent`]: changePercent._15min,
    [`one_hour_listings_change_percent`]: changePercent._1hour,
    [`six_hour_listings_change_percent`]: changePercent._6hour,
    [`twelve_hour_listings_change_percent`]: changePercent._12hour,
    [`one_day_listings_change_percent`]: changePercent._1day,
    [`seven_day_listings_change_percent`]: changePercent._7day
  }
}
