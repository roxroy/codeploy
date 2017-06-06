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
	const newResource = Resource({
	  title: req.body.title,
	  description: req.body.description,
	  url: req.body.url,
	  reviews: req.body.reviews,
	  language: req.body.language,
	  image: req.body.image,
	  rating: req.body.rating,
	});

	newResource.save(function(err, resource) {
	  if (err) throw err;
	  console.log('Resource created!');
	  res.status(200).send(resource);
	});
};

module.exports.update = (req, res) => {
	Resource.findById(req.body._id, function(err, resource) {
	  if (err) throw err;

	  resource.title = req.body.title;
	  resource.description = req.body.description;
	  resource.url = req.body.url;
	  resource.reviews = req.body.reviews;
	  resource.language = req.body.language;
	  resource.image = req.body.image;
	  resource.rating = req.body.rating;

	  resource.save(function(err) {
	    if (err) throw err;

	    console.log('Resource successfully updated!');
	  	res.status(200).send(resource);
	  });
	});
};

module.exports.remove = (req, res) => {
	Resource.findById(req.body._id, function(err, resource) {
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
