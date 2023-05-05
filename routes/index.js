/**
 * All api routes handles here
 * @author Yousuf Kalim
 */
const router = require('express').Router();

// Parent Routes
router.use('/users', require('./users')); // All the user routes
router.use('/auth', require('./auth')); // All the auth routes
router.use('/nft', require('./nft')); // All the auth routes
router.use('/listedItem', require('./listedItem')); // All the auth routes

// Export
module.exports = router;
