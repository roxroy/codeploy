let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let jobSchema = new Schema({
  title: String,
  company: String,
  description: String,
  date_applied: Date,
  comments: String,
});

module.exports =  mongoose.model('Job', jobSchema);
