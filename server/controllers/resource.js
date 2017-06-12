let Resource = require('../models/resource');

const makeDate = (daysAdjustment) => {
	let currentTime = new Date();
	currentTime.setDate(currentTime.getDate()+daysAdjustment);
	return currentTime;
}

module.exports.all = (req, res) => {

 	const loremipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida est sit amet mi egestas, a pharetra sem hendrerit. Ut sit amet lacinia ex, vel pellentesque metus. In placerat, lacus eget porttitor imperdiet, sem nibh faucibus turpis, ultricies ultricies turpis orci in augue. Integer ut posuere ante. Pellentesque blandit purus at tortor malesuada porttitor venenatis sed lacus.";
 	let myResources = [
    { "image": "https://www.sololearn.com/Icons/Courses/1024.png", "addedBy":"roxroy", "url": "https://www.website1.com/", "name": "abcd", "dateAdded": makeDate(-2), "rating": "1/5", "golds": "1", "description": loremipsum },
    { "image": "https://image.flaticon.com/teams/new/1-freepik.jpg", "addedBy":"CClar", "url": "https://www.website2.com/", "name": "aaab", "dateAdded": makeDate(-162), "rating": "2/5", "golds": "2", "description": loremipsum },
    { "image": "http://www.freeiconspng.com/uploads/flat-mac-icon-15.png", "addedBy":"icartusacrimea", "url": "https://www.website3.com/", "name": "accc", "dateAdded": makeDate(-31), "rating": "3/5", "golds": "3", "description": loremipsum }
 	];

	Resource.find({}, function(err, resources) {
	  if (err) throw err;

	  // lets add the real data to the sample data : TODO - remove once working
	  resources.forEach( item => {
	  	myResources.push({
	  		name :  item.name,
	  		description: item.description,
	  		image:  item.image,
	  		addedBy: item.addedBy,
	  		url: item.url,
	  		rating : item.rating,
	  		dateAdded : item.dateAdded
	  	});
	  });
	  
	  resources = myResources;

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
	let newResource = Resource({
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
	  res.status(200).send(resource);
	});
};

module.exports.update = (req, res) => {
	Resource.findById(req.body._id, function(err, resource) {
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
  let text = `Hello, username! Current date and time: ${new Date()}`;
  res.send('{"message":"' + text + '"}');
};
