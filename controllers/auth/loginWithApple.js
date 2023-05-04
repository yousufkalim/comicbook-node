// const AppleStrategy = require('passport-apple').Strategy;
// const passport = require('passport');
// const Users = require('../../models/Users');
// module.exports = (passport) => {
//   passport.use(
//     new AppleStrategy(
//       {
//         clientID: process.env.APPLE_CLIENT_ID,
//         teamID: process.env.APPLE_TEAM_ID,
//         keyID: process.env.APPLE_KEY_ID,
//         privateKeyPath: process.env.APPLE_PRIVATE_KEY_PATH,
//         callbackURL: process.env.APPLE_CALLBACK_URL,
//         scope: ['name', 'email'],
//       },
//       function (accessToken, refreshToken, profile, cb) {
//         return cb(null, profile);
//       },
//     ),
//   );
// };
// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   Users.findById(id, function (err, user) {
//     done(err, user);
//   });
// });
