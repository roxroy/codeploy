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
	let myJobs = [
		{ "jobPosition": "position 1", "companyName": "Widget name1", "addedBy": username, "dateApplied": makeDate(-2), "resources": myResources, "comments": "sent thank you note. received no response." },
		{ "jobPosition": "position 2", "companyName": "ABC name2", "addedBy": username,"dateApplied": makeDate(-132), "resources": myResources, "comments": "sent thank you note. received no response." },
		{ "jobPosition": "position 3", "companyName": "Net name3 ", "addedBy": username, "dateApplied": makeDate(-52), "resources": myResources, "comments": "sent thank you note. received no response." },
		{ "jobPosition": "position 4", "companyName": "Carter",  "addedBy": username, "dateApplied": makeDate(-200), "resources": myResources, "comments": "Sent references. Waiting on reply." },
	];


	Jobs.find({addedBy : username }, function(err, jobs) {
	  if (err) throw err;

	  // lets add the real data to the sample data : TODO - remove once working
	  jobs.forEach( item => {
	  	myJobs.push({
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
};
