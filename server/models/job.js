let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let jobSchema = new Schema({
  jobPosition: String,
  companyName: String,
  resources: String,
  dateApplied: Date,
  comments: String,
});

module.exports =  mongoose.model('Job', jobSchema);
