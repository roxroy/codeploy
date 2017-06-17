let Jobs = require('../models/job');

const makeDate = (daysAdjustment) => {
	let currentTime = new Date();
	currentTime.setDate(currentTime.getDate()+daysAdjustment);
	return currentTime;
}

module.exports.all = (req, res) => {
	let username = "";
	if (req.user)
		username = req.user.username;


	const myResources = [
		{ "image": "https://www.sololearn.com/Icons/Courses/1024.png", "url": "https://www.website1.com/", "addedBy": "user1", "name": "abcd", "date": makeDate(-2), "rating": "1/5", "golds": "1" },
		{ "image": "https://www.sololearn.com/Icons/Courses/1024.png", "url": "https://www.website2.com/", "addedBy": "user2", "name": "aaab", "date": makeDate(-100), "rating": "2/5", "golds": "2" },
		{ "image": "https://www.sololearn.com/Icons/Courses/1024.png", "url": "https://www.website3.com/", "addedBy": "user3", "name": "name3", "date": makeDate(-80), "rating": "3/5", "golds": "3" },
	];

	Jobs.find({addedBy : username }, function(err, jobs) {
	  if (err) throw err;

	  jobs.forEach( item => {
	  	myJobs.push({
	  		ID : item._id,
	  		jobPosition :  item.jobPosition,
	  		companyName: item.companyName,
	  		dateApplied:  item.dateApplied,
	  		addedBy:  item.addedBy,
	  		resources: myResources,
	  		comments: item.comments,
	  	});
	  });
	  
	  jobs = myJobs;
		res.status(200).send(jobs);
	});
};

module.exports.one = (req, res) => {
};

module.exports.new = (req, res) => {
	let newJob = Jobs({
	  jobPosition: req.body.jobPosition,
	  companyName: req.body.companyName,
	  addedBy: req.body.addedBy,
	  dateApplied: req.body.dateApplied,
	  resources: req.body.resources,
	  comments: req.body.comments,
	});

	newJob.save(function(err, job) {
	  if (err) throw err;
	  console.log('Job created!');
	  res.status(200).send(job);
	});
};

module.exports.update = (req, res) => {
};

module.exports.remove = (req, res) => {
	const id = req.params.id;
	console.log(id);
	if (id && id !== 'undefined') {
	  console.log('Job deleted: ' + id );
		Jobs.findById(id, function(err, job) {
		  if (err) throw err;

		 	job.remove(function(err) {
		    if (err) throw err;

		    console.log('Job successfully deleted: ' + id );
		  });
		});
	}
};
