const express = require('express');
const path = require('path');
const app = express();
let mongoose = require('mongoose');

let userRoutes = require('./routes/users'),
	  resourceRoutes = require('./routes/resources'),
	  jobRoutes = require('./routes/jobs');

const PORT = process.env.PORT || 3001;

// Connect mongoose to our local database
let dbUri = process.env.MONGOLAB_URI || 'mongodb://localhost/codeploy';
mongoose.connect(dbUri);

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/api', resourceRoutes.index);

app.get('/api/resources/', resourceRoutes.all);
app.get('/api/resources/:id', resourceRoutes.one);
app.post('/api/resources', resourceRoutes.new);
app.put('/api/resources/:id', resourceRoutes.update);

app.get('/api/jobs/', jobRoutes.all);
app.get('/api/jobs/:id', jobRoutes.one);
app.post('/api/jobs', routes.new);
app.put('/api/jobs/:id', routes.update);

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
