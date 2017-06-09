let Resource = require('../models/resource');

module.exports.all = (req, res) => {
	Resource.find({}, function(err, resources) {
	  if (err) throw err;

	  res.status(200).send(resources);
	});
};

module.exports.one = (req, res) => {
	Resource.find({ id: req.body._id }, function(err, resource) {
	  if (err) throw err;

	  console.log(resource);
	  res.status(200).send(resource);
	});
};

module.exports.new = (req, res) => {
 console.log('newResource body', req.body);
	let newResource = Resource({
	  title: req.body.name,
	  description: req.body.description,
	  url: req.body.url,
	  //reviews: req.body.reviews,
	  //language: req.body.language,
	  image: req.body.image,
	  rating: 2  // parseInt(req.body.rating, 10),
	});
 console.log('newResource', newResource);

	newResource.save(function(err, resource) {
	  if (err) throw err;
	  console.log('Resource created!');
	  res.status(200).send(resource);
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
  let text = `Hello, username! Current date and time: ${new Date()}`;
  res.send('{"message":"' + text + '"}');
};
