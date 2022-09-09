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
      //ONE
      console.log(item)

      if (Date.now() - TIME.MINUTE.ONE <= item.timestamp) {
        if (timeframe._1min === null) timeframe._1min = item.price
        else if (parseFloat(item.price) < parseFloat(timeframe._1min))
          timeframe._1min = item.price
      }
      //TWO
      else if (Date.now() - TIME.MINUTE.TWO <= item.timestamp) {
        if (timeframe._2min === null) timeframe._2min = item.price
        else if (parseFloat(item.price) < parseFloat(timeframe._2min))
          timeframe._2min = item.price
      }
      // FIVE
      else if (Date.now() - TIME.MINUTE.FIVE <= item.timestamp) {
        if (timeframe._5min === null) timeframe._5min = item.price
        else if (parseFloat(item.price) < parseFloat(timeframe._5min))
          timeframe._5min = item.price
      }
      //TEN
      else if (Date.now() - TIME.MINUTE.TEN <= item.timestamp) {
        if (timeframe._10min === null) timeframe._10min = item.price
        else if (parseFloat(item.price) < parseFloat(timeframe._10min))
          timeframe._10min = item.price
      }
      //FIFTEEN
      else if (Date.now() - TIME.MINUTE.FIFTEEN <= item.timestamp) {
        if (timeframe._15min === null) timeframe._15min = item.price
        else if (parseFloat(item.price) < parseFloat(timeframe._15min))
          timeframe._15min = item.price
      }
      //THIRTY
      else if (Date.now() - TIME.MINUTE.THIRTY <= item.timestamp) {
        if (timeframe._30min === null) timeframe._30min = item.price
        else if (parseFloat(item.price) < parseFloat(timeframe._30min))
          timeframe._30min = item.price
      }
      //ONE HOUR
      else if (Date.now() - TIME.HOUR.ONE <= item.timestamp) {
        if (timeframe._1hour === null) timeframe._1hour = item.price
        else if (parseFloat(item.price) < parseFloat(timeframe._1hour))
          timeframe._1hour = item.price
      }
      //TWO HOUR
      else if (Date.now() - TIME.HOUR.TWO <= item.timestamp) {
        if (timeframe._2hour === null) timeframe._2hour = item.price
        else if (parseFloat(item.price) < parseFloat(timeframe._2hour))
          timeframe._2hour = item.price
      }
      //SIX HOUR
      else if (Date.now() - TIME.HOUR.SIX <= item.timestamp) {
        if (timeframe._6hour === null) timeframe._6hour = item.price
        else if (parseFloat(item.price) < parseFloat(timeframe._6hour))
          timeframe._6hour = item.price
      }
      //TWELVE HOUR
      else if (Date.now() - TIME.HOUR.TWELVE <= item.timestamp) {
        if (timeframe._12hour === null) timeframe._12hour = item.price
        else if (parseFloat(item.price) < parseFloat(timeframe._12hour))
          timeframe._12hour = item.price
      }
      //ONE DAY
      else if (Date.now() - TIME.DAY.ONE <= item.timestamp) {
        if (timeframe._1day === null) timeframe._1day = item.price
        else if (parseFloat(item.price) < parseFloat(timeframe._1day))
          timeframe._1day = item.price
      }
      //TWO DAY
      else if (Date.now() - TIME.DAY.TWO <= item.timestamp) {
        if (timeframe._2day === null) timeframe._2day = item.price
        else if (parseFloat(item.price) < parseFloat(timeframe._2day))
          timeframe._2day = item.price
      }
      //SEVEN DAY
      else if (Date.now() - TIME.DAY.SEVEN <= item.timestamp) {
        if (timeframe._7day === null) timeframe._7day = item.price
        else if (parseFloat(item.price) < parseFloat(timeframe._7day))
          timeframe._7day = item.price
      }
      //FOURTEEN DAY
      else if (Date.now() - TIME.DAY.FOURTEEN <= item.timestamp) {
        if (timeframe._14day === null) timeframe._14day = item.price
        else if (parseFloat(item.price) < parseFloat(timeframe._14day))
          timeframe._14day = item.price
      }
    }

    console.log(timeframe)

    /*
    let changePercent = {
      _1min: String((timeframe._1min / timeframe._2min) * 100) + ' %',
      _5min: String((timeframe._5min / timeframe._10min) * 100) + ' %',
      _15min: String((timeframe._15min / timeframe._30min) * 100) + ' %',
      _1hour: String((timeframe._1hour / timeframe._2hour) * 100) + ' %',
      _6hour: String((timeframe._6hour / timeframe._12hour) * 100) + ' %',
      _12hour: String((timeframe._12hour / timeframe._1day) * 100) + ' %',
      _1day: String((timeframe._1day / timeframe._2day) * 100) + ' %',
      _7day: String((timeframe._7day / timeframe._14day) * 100) + ' %'
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
    */

    return {
      isSuccess: true,
      data: null
    }
  } catch (e) {
    console.log(e)
    return {
      isSuccess: false
    }
  }
}

const changePercentStructure = (collectionId, changePercent) => {
  return {
    collectionId: collectionId,
    one_minute_listings_change_percent: changePercent._1min,
    five_minute_listings_change_percent: changePercent._5min,
    fifteen_minute_listings_change_percent: changePercent._15min,
    one_hour_listings_change_percent: changePercent._1hour,
    six_hour_listings_change_percent: changePercent._6hour,
    twelve_hour_listings_change_percent: changePercent._12hour,
    one_day_listings_change_percent: changePercent._1day,
    seven_day_listings_change_percent: changePercent._7day
  }
}
