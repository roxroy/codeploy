let Resource = require('../models/resource');

module.exports.all = (req, res) => {
	Resource.find({}, function(err, resources) {
	  if (err) throw err;

	  console.log(resources);
	});
};

module.exports.one = (req, res) => {
	Resource.find({ id: '55' }, function(err, resource) {
	  if (err) throw err;

	  console.log(resource);
	});
};

module.exports.new = (req, res) => {
	var newResource = Resource({
	  title: 'Resource +' (new Date()),
	  description: 'Node + React',
	  rating: 4
	});

	newResource.save(function(err) {
	  if (err) throw err;

	  console.log('Resource created!');
	});
};

module.exports.update = (req, res) => {
	Resource.findById(1, function(err, resource) {
	  if (err) throw err;

	  resource.title = 'New title';

	  resource.save(function(err) {
	    if (err) throw err;

	    console.log('Resource successfully updated!');
	  });
	});
};

module.exports.remove = (req, res) => {
	Resource.find({ id: '55' }, function(err, resource) {
	  if (err) throw err;

	 	resource.remove(function(err) {
	    if (err) throw err;

	    console.log('Resource successfully deleted!');
	  });
	});
};


module.exports.index = (req, res) => {
  res.set('Content-Type', 'application/json');
  let text = `Hello from the backend server @ ${new Date()}`;
  res.send('{"message":"' + text + '"}');
};
