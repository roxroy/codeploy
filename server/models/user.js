let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  id: String,
  token: String,
  provider: String,
  username: String,
});

module.exports =  mongoose.model('User', userSchema);
