let passport = require('passport');
let GitHubStrategy = require('passport-github2').Strategy;
let User = require('../models/user');
require('dotenv').config()

module.exports = function () {
	passport.serializeUser(function (user, done) {
		done(null, user._id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	passport.use(new GitHubStrategy({
		clientID: process.env.GITHUB_KEY,
		clientSecret: process.env.GITHUB_SECRET,
		callbackURL: process.env.callbackURL + '/github/callback'
	},
	function (token, refreshToken, profile, done) {
		process.nextTick(function () {
			User.findOne({ 'id': profile.id }, function (err, user) {
				if (err) {
					return done(err);
				}

				if (user) {
					return done(null, user);
				} else {
					let newUser = new User();
					newUser.token = token;
					newUser.provider = 'github';

					newUser.id = profile.id;
					newUser.username = profile.username;

					newUser.save(function (err) {
						if (err) {
							throw err;
						}

						return done(null, newUser);
					});
				}
			});
		});
	}));
};
