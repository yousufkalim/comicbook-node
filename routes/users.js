const router = require('express').Router();
const users = require('../controllers/users');
const { checkAuth } = require('../middleware/checkAuth');
// const { upload } = require('../middleware/multer');
const { validateUser, isValidated } = require('../middleware/validators');

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post user signup
 * @method get get all users
 * @method get get user by id
 * @method put update user
 * @method delete delete user
 */

// Create - User Signup
router.post('/', validateUser, isValidated, users.create);

// Read
router.get('/', users.getAll); // Get all users at once
router.get('/:userId', checkAuth, users.getById); // Get one user by it's id

// Export
module.exports = router;
