var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/test',{useMongoClient: true})

var userSch = {
  profile: {
    user: {
      type: String,
      required: true,
      lowercase: true
    },
    picture: {
      type: String,
      required: true,
      match: /^http:\/\//i
    }
  },
  data: {
    oauth: {
      type: String,
      required: true
    },
    cart: [{
      product: {
        type: mongoose.Schema.Types.ObjectId
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1
      }
    }]
  }
}

var userSchema = new mongoose.Schema(userSch)
// Insert quotes for the model name and collection while creating model
var User = mongoose.model('User',userSchema,'users')

module.exports = User
module.exports.userSch = userSch