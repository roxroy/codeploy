let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// create a schema
let jobSchema = new Schema({
  title: String,
  company: String,
  description: String,
  date_applied: Date,
  created_at: Date,
  updated_at: Date
});

module.exports =  mongoose.model('Job', jobSchema);
