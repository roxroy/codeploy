var express = require('express');
let passport = require('passport');
var router = express.Router();
var path = require('path');

//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHub will redirect the user
//   back to this application at /auth/github/callback
router.get('/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }),
  function(req, res){
  }
);

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

router.get('/logout', function(req, res) {
  let user = req.user;
  req.logout();
  res.status(200).json({
    status: 'logout successful!'
  });
});

var isAuthenticated = function(req,res,next){
   if(req.user)
      return next();
   else
      return res.status(401).json({
        error: 'User not authenticated'
      })
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // req.user is available for use here
    return next(); }

  // denied. redirect to login
  res.redirect('/')
}

router.get('/isauth', function(req, res){
  if (req.isAuthenticated()) {
    res.status(200).json({
        status: 'Login successful!',
        username : req.user.username,
    });
  } else {
    res.status(401).json({
        status: 'User not authenticated'
    });
  }
});

module.exports = router;
