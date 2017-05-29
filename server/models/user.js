let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  id: String,
  username: String,
  displayName: String,
  created_at: Date,
  updated_at: Date
});

userSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});

module.exports =  mongoose.model('User', userSchema);
