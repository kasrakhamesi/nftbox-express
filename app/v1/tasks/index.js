module.exports.trendings = require('./trendings')
module.exports.stats = require('./stats')
module.exports.traits = require('./traits')
module.exports.tokensId = require('./tokensId')
module.exports.listings = require('./listings')
module.exports.liveListings = require('./liveListings')
module.exports.sales = require('./sales')
module.exports.gasStations = require('./gasStations')
module.exports.liveSales = require('./liveSales')

module.exports.run = async () => {
  //this.liveListings()
  //this.trendings()
  //this.traits()
  this.tokensId()
  //this.listings()
  //this.sales()
  //this.stats()
  //this.gasStations()
  // this.liveSales()
}
