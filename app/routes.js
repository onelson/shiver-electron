'use strict';

// Routers.
module.exports = function(app, passport) {
  app.get('/', function(req, res, next) {
    if (req.user) { console.log(req.user.displayName); }
    res.render('index', { user: req.user })
  });

  app.get('/auth/twitch', passport.authenticate('twitch'));
  app.get('/auth/twitch/callback',
    passport.authenticate('twitch', {
      successRedirect: '/',
      failureRedirect: '/'
    })
  );
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
}

function isLoggedIn(res, req, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}
