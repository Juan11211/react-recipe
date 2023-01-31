const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipesSchema = new Schema({
  image: {
    type: String,
  },
})

module.exports = mongoose.model("Recipes", recipesSchema)