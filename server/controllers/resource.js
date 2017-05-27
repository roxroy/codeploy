let Resource = require('../models/resource');

module.exports.all = (req, res) => {
};

module.exports.one = (req, res) => {
};

module.exports.new = (req, res) => {
};

module.exports.update = (req, res) => {
};

module.exports.index = (req, res) => {
  res.set('Content-Type', 'application/json');
  let text = `Hello from the backend server @ ${new Date()}`;
  res.send('{"message":"' + text + '"}');
};
