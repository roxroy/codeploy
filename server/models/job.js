let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let jobSchema = new Schema({
  title: String,
  company: String,
  description: String,
  date_applied: Date,
  created_at: Date,
  updated_at: Date
});

jobSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});

module.exports =  mongoose.model('Job', jobSchema);
