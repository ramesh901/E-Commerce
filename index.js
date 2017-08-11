//Give single quote around packages
var express = require('express')
var wagner = require('wagner-core')
require('./product')(wagner)

app = express()
app.get('/category/id/:id',function(req,res) {
 require('./category').findOne({ _id: req.params.id},function(err,docs){
   if(err){
     return res.json({error: error.toString()})
   }
   if(!docs){
      return res.json({error: 'category not found.'})
   }
   res.json({category: docs})
 }
)
})

app.get('/category/parent/:id',function(req,res) {
   require('./category').find({ parent: req.params.id}).
   sort({ _id: 1}).exec(function(err,docs){
      if(err){
       return res.json({error: error.toString()})
     }
     if(!docs){
        return res.json({error: 'parent not found.'})
     }
     res.json({parent: docs})
   })

})

app.get('/product/id/:id', wagner.invoke(function(Product) {
    return function(req, res) {
      Product.findOne({ _id: req.params.id },function(err,product){
        if(err){
          return res.json({error: error.toString()})
        }
        if(!product){
           return res.json({error: 'product not found.'})
        }
        res.json({product: product})
      }
     )
  }}
))


app.listen(3002)
console.log('Listening to port 3002')
