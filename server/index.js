const express = require('express');
const path = require('path');
const app = express();
let mongoose = require('mongoose');

let userCtrl = require('./controllers/user'),
	  resourceCtrl = require('./controllers/resource'),
	  jobCtrl = require('./controllers/job');

const PORT = process.env.PORT || 3001;

// Connect mongoose to our local database
let dbUri = process.env.MONGOLAB_URI || 'mongodb://localhost/codeploy';
mongoose.connect(dbUri);

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/api', resourceCtrl.index);

app.get('/api/resources/', resourceCtrl.all);
app.get('/api/resources/:id', resourceCtrl.one);
app.post('/api/resources', resourceCtrl.new);
app.post('/api/resources/:id', resourceCtrl.update);

app.get('/api/jobs/', jobCtrl.all);
app.get('/api/jobs/:id', jobCtrl.one);
app.post('/api/jobs', jobCtrl.new);
app.post('/api/jobs/:id', jobCtrl.update);

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
