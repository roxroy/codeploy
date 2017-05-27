let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// create a schema
let resourceSchema = new Schema({
  title: String,
  description: String,
  url: String,
  reviews: String,
  language: String,
  image: String,
  rating: Number,
  created_at: Date,
  updated_at: Date
});

module.exports =  mongoose.model('Resource', resourceSchema);
