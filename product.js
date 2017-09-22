var mongoose = require('mongoose')
var category = require('./category')
var fx = require('./fx')
// var wagner = require('wagner-core')
// module.exports = function(wagner) {
// mongoose.connect('mongodb://localhost:27017/test',{useMongoClient: true})

var productStr = {
  name: { type: String, required: true },
  pictures: [{ type: String, match: /^http:\/\//i
  }],
  price: {
    amount: { type: Number, required: true },
    currency: { type: String, required: true, enum: ['USD', 'GBD', 'EUR'] }
  },
  category: category.categoryStr,
  internal: {
    approximatePriceUSD: Number
  }
}

var productSchema = new mongoose.Schema(productStr)
module.exports = productSchema
module.exports.productStr = productStr
/*
// Insert quotes for the model name and collection while creating model
var Product = mongoose.model('Product',productSchema,'products')

wagner.factory('Product', function() {
  return Product;
})
}
//module.exports = Product
//module.exports.productStr = productStr
*/
