const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: { 
        type: String, 
        unique: true,
        required: true, 
        lowercase: true
    }, 
    email: { 
        type: String, 
        unique: true, 
        required: true, 
    }, 
    password: {
        type: String, 
        required: true
    },
    recipes: {
        type: Array,
        default: []
    }, 
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    favoriteRecipes: {
        type: Array
    },
    
})

userSchema.pre('save', function(next){
    const user = this
    if(!user.isModified('password')) return next()
    bcrypt.hash(user.password, 10, (err, hash) => {
        if(err) return next(err)
        user.password = hash
        next()
    })
})

// method to check encrypted password on login
userSchema.methods.checkPassword = function(passwordAttempt, callback){
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
      if(err) return callback(err)
      return callback(null, isMatch)
    })
  }
  
  // method to remove user's password for token/sending the response
  userSchema.methods.withoutPassword = function(){
    const user = this.toObject()
    delete user.password
    return user
  }
  
  module.exports = mongoose.model("User", userSchema)