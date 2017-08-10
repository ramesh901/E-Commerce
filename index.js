//Give single quote around packages
var express = require('express')

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
app.listen(3002)
console.log('Listening to port 3002')
