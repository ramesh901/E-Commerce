var mongoose = require(./mongoose)
var category = require(./category)

mongoose.connect('mongodb://localhost:27017/test',{useMongoClient: true})

var productStr = {
  name: { type: String, required: true },
  amount: {
    price: { type: Number, required: true },
    currency: { type: String, required: true, enum: ['USD','GBD','EUR'] }
  }
  category: category.categoryStr;
}

var productSchema = new mongoose.Schema(productStr)
var Product = mongoose.model('Product',productSchema,products)
module.exports = productSchema
module.exports.productStr = productStr
