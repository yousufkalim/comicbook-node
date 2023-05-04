var passport = require('passport');
const Users = require('../../models/Users');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
// const session = require("express-session");
module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK,
        scope: ['profile'],
        // state: true,
      },
      function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
      },
    ),
  );
};
passport.serializeUser(function (profile, done) {
  done(null, profile);
});

passport.deserializeUser(function (profile, done) {
  done(null, profile);
});
