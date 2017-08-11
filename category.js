//Use quotes for the npm package
var mongoose = require('mongoose')

//var assert = require('assert');
//'Category' reference is actually a model name created out of this Schema
mongoose.connect('mongodb://localhost:27017/test',{useMongoClient: true})

var categoryStr = {
  _id: {type: String},
  parent : {
    type: String,
    ref: 'Category'
  },
  ancestors: [{
    type: String,
    ref: 'Category'
  }]
}

categorySchema = new mongoose.Schema(categoryStr)
var Category = mongoose.model('Category',categorySchema,'categories')
module.exports = Category
module.exports.categoryStr = categoryStr
