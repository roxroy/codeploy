let Jobs = require('../models/job');

const makeDate = (daysAdjustment) => {
	let currentTime = new Date();
	currentTime.setDate(currentTime.getDate()+daysAdjustment);
	return currentTime;
}

const mapItem = (item) => {
	return {
	  		ID : item._id,
	  		jobPosition :  item.jobPosition,
	  		companyName: item.companyName,
	  		dateApplied:  item.dateApplied,
	  		addedBy:  item.addedBy,
	  		resources: item.resources,
	  		comments: item.comments,
	}
}

module.exports.all = (req, res) => {
	let username = "";
	if (req.user)
		username = req.user.username;

	Jobs.find({addedBy : username })
	  .populate('Resource')
	  .exec(function(err, jobs) {
		  if (err) throw err;

		  let myJobs = [];
		  jobs.forEach( item => {
		  	myJobs.push(mapItem(item));
		  });
		  
			res.status(200).send(myJobs);
		});

};

module.exports.one = (req, res) => {
};

module.exports.newResource = (req, res) => {
 	Jobs.findById(req.body.jobID)
	  .populate('Resource')
	  .exec(function(err, job) {
		  if (err) throw err;

		  job.resources.push(req.body.resourceID);
		  job.save(function(err) {
		    if (err) throw err;

		    console.log('Job-Resource successfully updated!');
		  	res.status(200).send(job);
		  });
		});
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
	  res.status(200).send(mapItem(job));
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
