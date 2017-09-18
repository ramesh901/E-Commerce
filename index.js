//Give single quote around packages
var bodyparser = require('body-parser')
var express = require('express')
var wagner = require('wagner-core')
var status = require('http-status');
require('./models')(wagner);


app = express()
wagner.invoke(require('./auth'), { app: app });

app.use(function(req, res, next) {
    require('./user').findOne({}, function(error, user) { req.user = user; next(); });
  }
);

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

module.exports = function(wagner) {
  var api = express.Router();

  api.use(bodyparser.json());

  api.put('/me/cart', wagner.invoke(function(User) {
    return function(req, res) {
      try {
        var cart = req.body.data.cart;
      } catch(e) {
        return res.
          status(status.BAD_REQUEST).
          json({ error: 'No cart specified!' });
      }

      req.user.data.cart = cart;
      req.user.save(function(error, user) {
        if (error) {
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({ error: error.toString() });
        }
        return res.json({ user: user });
      });
    };
  }));

  api.get('/me', function(req, res) {
    if (!req.user) {
      return res.
        status(status.UNAUTHORIZED).
        json({ error: 'Not logged in' });
    }

    req.user.populate({ path: 'data.cart.product', model: 'Product' }, handleOne.bind(null, 'user', res));
  });

  return api;
};

function handleOne(property, res, error, result) {
  if (error) {
    return res.
      status(status.INTERNAL_SERVER_ERROR).
      json({ error: error.toString() });
  }
  if (!result) {
    return res.
      status(status.NOT_FOUND).
      json({ error: 'Not found' });
  }

  var json = {};
  json[property] = result;
  res.json(json);
}
app.listen(3002)
console.log('Listening to port 3002')
