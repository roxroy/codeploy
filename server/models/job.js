let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// create a schema
let jobSchema = new Schema({
  name: String,
  created_at: Date,
  updated_at: Date
});

module.exports =  mongoose.model('Job', userSchema);
