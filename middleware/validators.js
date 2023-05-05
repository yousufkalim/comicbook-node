/**
 * All the validation
 * @author Yousuf Kalim
 */
const { check, validationResult } = require('express-validator');

/*
====================
Validations
====================
*/

// You can create multiple validations strategies (Read express-validator documentation for more details)
// User Signup Validation
exports.validateUser = [
  check('first_name', 'First Name is required.').notEmpty().trim(),
  check('last_name', 'last Name is required.').notEmpty().trim(),
  check('email', 'Email is required.').notEmpty().isEmail().trim(),
  check('password', 'Password is required.').notEmpty().trim().isLength({ min: 8 }),
];

// User Signup Validation
exports.validateUserUpdate = [
  check('name', 'Name is required.').notEmpty().trim(),
  check('email', 'Email is required.').notEmpty().isEmail().trim(),
  check('number', 'Number is required.').notEmpty().isNumeric().trim(),
  check('gender').trim(),
  check('role').trim(),
  check('address').trim(),
  check('city').trim(),
  check('country').trim(),
];

// Login validation
exports.validateLogin = [
  check('email', 'Email is required').notEmpty().isEmail().trim().toLowerCase(),
  check('password', 'Password is required.').notEmpty().trim().isLength({ min: 8 }),
];

// Change password validation
exports.changePasswordValidate = [
  check('oldPassword', 'Old Password is required.').notEmpty().trim().isLength({ min: 8 }),
  check('newPassword', 'New password is required.').notEmpty().trim().isLength({ min: 8 }),
  check('confirmPassword', 'Confirm password is required.').notEmpty().trim().isLength({ min: 8 }),
];
exports.validateNft = [
  check('user', 'User is require.').notEmpty().trim(),
  check('name', 'Item name is required.').notEmpty().trim(),
  check('description', 'Description is required.').notEmpty(),
  check('category', 'Select your Category').notEmpty().trim(),
  check('properties', 'properties is required.').notEmpty().trim(),
  check('level', 'Enter the level').notEmpty().trim(),
  check('stats', 'Enter the stats').notEmpty().trim(),
  check('blockchain', 'Select your blockchain').notEmpty().trim(),
  check('metadata', 'Enter the metadata').notEmpty().trim(),
];
exports.validateListedItems = [
  check('nft', 'Nft is required.').notEmpty().trim(),
  check('type', 'Select your type').notEmpty().trim(),
  check('method', 'Select your method').notEmpty().trim(),
  check('price', 'Enter the price').notEmpty().trim(),
  check('royalty', 'Select the royalty').notEmpty().trim(),
  check('duration', 'Enter the duration').notEmpty().trim(),
];

/*
======================
Result
======================
*/

/**
 * To check if request validated successfully or not, according to our validation strategies
 * @param {object} req
 * @param {object} res
 * @param {*} next
 */
exports.isValidated = (req, res, next) => {
  const errors = validationResult(req); // Validating the request by previous middleware's strategy
  if (!errors.isEmpty()) {
    // On error
    res.status(400).send({ success: false, message: errors.array()[0].msg }); // Sending first error to the client from array of errors
  } else {
    // Validated successfully
    next(); // Pass the request to next middleware or controller
  }
};
