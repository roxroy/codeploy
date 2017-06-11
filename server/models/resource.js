let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let resourceSchema = new Schema({
  name: String,
  description: String,
  url: String,
  language: String,
  image: String,
  rating: String,
  golds: String,
  addedBy: String,
  dateAdded: Date,
});

module.exports =  mongoose.model('Resource', resourceSchema);
