let Resource = require('../models/resource');

module.exports.all = (req, res) => {

 	const loremipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida est sit amet mi egestas, a pharetra sem hendrerit. Ut sit amet lacinia ex, vel pellentesque metus. In placerat, lacus eget porttitor imperdiet, sem nibh faucibus turpis, ultricies ultricies turpis orci in augue. Integer ut posuere ante. Pellentesque blandit purus at tortor malesuada porttitor venenatis sed lacus.";
 	const sampleResources = [
    { "image": "https://www.sololearn.com/Icons/Courses/1024.png", "language":"Javascript", "url": "https://www.website1.com/", "addedBy": "user1", "name": "abcd", "date": "01/03/2016", "rating": "1/5", "golds": "1", "description": loremipsum },
    { "image": "https://image.flaticon.com/teams/new/1-freepik.jpg", "language":"C#", "url": "https://www.website2.com/", "addedBy": "user2", "name": "aaab", "date": "02/14/2017", "rating": "2/5", "golds": "2", "description": loremipsum },
    { "image": "http://www.freeiconspng.com/uploads/flat-mac-icon-15.png", "language":"Python", "url": "https://www.website3.com/", "addedBy": "user3", "name": "accc", "date": "01/01/2017", "rating": "3/5", "golds": "3", "description": loremipsum }
 	];

	Resource.find({}, function(err, resources) {
	  if (err) throw err;

	  // Send sample data
	  resources = sampleResources;
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
  let text = `Hello, username! Current date and time: ${new Date()}`;
  res.send('{"message":"' + text + '"}');
};
