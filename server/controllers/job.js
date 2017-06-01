let Jobs = require('../models/job');

const myResources = [
	{ "image": "https://www.sololearn.com/Icons/Courses/1024.png", "url": "https://www.website1.com/", "addedBy": "user1", "name": "abcd", "date": "01/03/2016", "rating": "1/5", "golds": "1" },
	{ "image": "https://www.sololearn.com/Icons/Courses/1024.png", "url": "https://www.website2.com/", "addedBy": "user2", "name": "aaab", "date": "02/14/2017", "rating": "2/5", "golds": "2" },
	{ "image": "https://www.sololearn.com/Icons/Courses/1024.png", "url": "https://www.website3.com/", "addedBy": "user3", "name": "name3", "date": "01/01/2017", "rating": "3/5", "golds": "3" },
];
const myJobs = [
	{ "jobPosition": "position 1", "companyName": "name1", "dateApplied": "01/dd/yy", "resources": myResources, "comments": "sent thank you note. received no response." },
	{ "jobPosition": "position 2", "companyName": "name2", "dateApplied": "02/dd/yy", "resources": myResources, "comments": "sent thank you note. received no response." },
	{ "jobPosition": "position 3", "companyName": "name3", "dateApplied": "03/dd/yy", "resources": myResources, "comments": "sent thank you note. received no response." },
	{ "jobPosition": "position 4", "companyName": "ABC", "dateApplied": "05/31/2017", "resources": myResources, "comments": "Sent references. Waiting on reply." },
];

module.exports.all = (req, res) => {
	Jobs.find({}, function(err, jobs) {
	  if (err) throw err;

		res.status(200).send(myJobs);
	});
};

module.exports.one = (req, res) => {
};

module.exports.new = (req, res) => {
};

module.exports.update = (req, res) => {
};

module.exports.remove = (req, res) => {
};
