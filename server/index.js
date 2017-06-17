const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
let passport = require('passport');
let github = require('./auth/github');
var session = require('express-session')

let mongoose = require('mongoose');

let userCtrl = require('./controllers/user'),
	  resourceCtrl = require('./controllers/resource'),
	  jobCtrl = require('./controllers/job');

let authRoutes = require('./routes/auth');

const PORT = process.env.PORT || 3000;

// Connect mongoose to our local database
let dbUri = process.env.MONGOLAB_URI || 'mongodb://localhost/codeploy';
mongoose.Promise = Promise;
mongoose.connect(dbUri);

app.use(express.static('./client/public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(session({ secret: 'modern art', resave: true, saveUninitialized: true }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
github(passport);

app.get('/api', resourceCtrl.index);

app.get('/api/resources', resourceCtrl.all);
app.get('/api/resources/:id', resourceCtrl.one);
app.post('/api/resources', resourceCtrl.new);
app.put('/api/resources/:id', resourceCtrl.update);
app.delete('/api/resources/:id', resourceCtrl.remove);

app.get('/api/jobs', jobCtrl.all);
app.get('/api/jobs/:id', jobCtrl.one);
app.post('/api/jobs', jobCtrl.new);
app.put('/api/jobs/:id', jobCtrl.update);
app.delete('/api/jobs/:id', jobCtrl.remove);
app.post('/api/jobs/resource', jobCtrl.newResource);

app.use('/', authRoutes);

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
