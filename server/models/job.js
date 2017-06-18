let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let jobSchema = new Schema({
  jobPosition: String,
  companyName: String,
  resources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
  dateApplied: Date,
  comments: String,
  addedBy: String,
});

module.exports =  mongoose.model('Job', jobSchema);
