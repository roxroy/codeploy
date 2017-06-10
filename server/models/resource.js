let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let resourceSchema = new Schema({
  name: String,
  description: String,
  url: String,
  language: String,
  image: String,
  rating: String,
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
