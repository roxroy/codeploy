let mongoose = require('mongoose');
let Schema = mongoose.Schema;

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

resourceSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});

module.exports =  mongoose.model('Resource', resourceSchema);
