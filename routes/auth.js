const router = require('express').Router();
const auth = require('../controllers/auth');
const { checkAuth } = require('../middleware/checkAuth');
// const { checkAuth } = require('../middleware/checkAuth');
const { validateLogin, isValidated } = require('../middleware/validators');
// var passport = require('passport');
// require('../controllers/auth/')(passport);
// require('../controllers/auth/loginWithGoogle')(passport);

router.post('/login', validateLogin, isValidated, auth.login); // Get all users at once
router.put('/update/:userId', checkAuth, auth.update);
router.get('/:userId', auth.getById); // Get one user by it's id

// router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// router.get(
//   '/auth/google/callback',
//   passport.authenticate('google', {
//     failureRedirect: process.env.FAILURE_REDIRECT,
//     successReturnToOrRedirect: process.env.SUCCESS_GOOGLE_CALLBACK,
//   }),
// );
// router.get('/auth/google/success', auth.loginWithGoogle);
// // router.get('/');
// router.get('/', checkAuth, auth.confirmAuth);
// router.put('/forgot/:email', auth.forgot);

// Export
module.exports = router;
