let Resources = require('../models/resource');

const makeDate = (daysAdjustment) => {
	let currentTime = new Date();
	currentTime.setDate(currentTime.getDate()+daysAdjustment);
	return currentTime;
}

const mapItem = (item) => {
	return {
	  		ID : item._id,
	  		name :  item.name,
	  		description: item.description,
	  		image:  item.image,
	  		addedBy: item.addedBy,
	  		url: item.url,
	  		rating : item.rating,
	  		dateAdded : item.dateAdded
	}
}

module.exports.all = (req, res) => {

	Resources.find({}, (err, resources) => {
	  if (err) throw err;

	  let myResources = [];
	  resources.forEach( item => {
	  	myResources.push(mapItem(item));
	  });
	  
	  res.status(200).send(myResources);
	});
};

module.exports.one = (req, res) => {
	Resources.find({ id: req.body.ID }, function(err, resource) {
	  if (err) throw err;

	  console.log(resource);
	  res.status(200).send(resource);
	});
};

module.exports.new = (req, res) => {
	let newResource = Resources({
	  name: req.body.name,
	  description: req.body.description,
	  url: req.body.url,
	  addedBy: req.body.addedBy,
	  image: req.body.image,
 		rating : req.body.rating,
 		dateAdded:  (new Date()) ,
	  golds: req.body.golds,
	});

	newResource.save(function(err, resource) {
	  if (err) throw err;
	  console.log('Resource created!');

	  res.status(200).send(mapItem(resource));
	});
};

module.exports.update = (req, res) => {
	Resources.findById(req.body._id, function(err, resource) {
	  if (err) throw err;

	  resource.name = req.body.name;
	  resource.description = req.body.description;
	  resource.url = req.body.url;
	  resource.reviews = req.body.reviews;
	  resource.addedBy = req.body.addedBy;
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
	const id = req.params.id;
	if (id && id !== 'undefined') {
	  console.log('Resource  deleted: ' + id );
		Resources.findById(id, function(err, resource) {
		  if (err) throw err;

		 	resource.remove(function(err) {
		    if (err) throw err;

		    console.log('Resource successfully deleted: ' + id );
		  });
		});
	}
};

module.exports.index = (req, res) => {
  res.set('Content-Type', 'application/json');
  let text = `Hello, username! Current date and time: ${new Date()}`;
  res.send('{"message":"' + text + '"}');
};
