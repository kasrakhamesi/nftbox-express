module.exports.trending = require('./trending')
module.exports.stats = require('./stats')
module.exports.traits = require('./traits')
module.exports.tokensId = require('./tokensId')
module.exports.listings = require('./listings')
module.exports.liveListings = require('./liveListings')
module.exports.sales = require('./sales')

module.exports.run = () => {
  this.liveListings()
  this.trending()
  this.traits()
  this.tokensId()
  this.listings()
  this.sales()
  this.stats()
}
