let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let resourceSchema = new Schema({
  name: String,
  description: String,
  url: String,
  language: String,
  image: String,
  rating: String,
  gold_stars: String,
  date_added: Date,
});

module.exports =  mongoose.model('Resource', resourceSchema);
