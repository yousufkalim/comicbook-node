/**
 * User auth controllers
 * @author Yousuf Kalim
 */
const Users = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../utils/sendEmail');
const bcryptSalt = process.env.BCRYPT_SALT || 10;
const tokenSecret = process.env.JWT_SECRET;

/**
 * Login
 * @param {object} req
 * @param {object} res
 */
exports.login = async (req, res) => {
  try {
    // Getting email and password
    const { email, password } = req.body;

    // Getting user from db
    const user = await Users.findOne({ email });

    if (!user) {
      // If user not found
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Comparing password
    const isMatched = bcrypt.compareSync(password, user.password);

    if (!isMatched) {
      // If password not matched
      return res.status(400).json({ success: false, message: 'Invalid Password' });
    }

    // Creating payload with user object
    delete user.password; // Removing password from user object
    const payload = { user };

    // Generating token
    jwt.sign(payload, tokenSecret, { expiresIn: '8h' }, (err, token) => {
      if (err) throw err;

      // done
      res.json({ success: true, user, token });
    });
  } catch (err) {
    // Error handling
    // eslint-disable-next-line no-console
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
exports.loginWithGoogle = async (req, res) => {
  try {
    const profile = req.user;
    const user = await Users.findOne({ email: profile.email });
    if (!user) {
      const newUser = new Users();
      newUser.username = profile.displayName;
      newUser.role = 'User';
      newUser.email.push(profile.email);
      const token = await generateAuthToken(newUser);
      await newUser.save();
      return res.redirect(process.env.CLIENT_URL + `/home/?SignupByGoogle=true&&user=${token}`);
    } else {
      const token = await generateAuthToken(user);
      return res.redirect(process.env.CLIENT_URL + `/home/?SignupByGoogle=true&&user=${token}`);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.loginWithApple = async (req, res) => {
  try {
    const profile = req.user;
    const user = await Users.findOne({ appleId: profile.id });
    if (!user) {
      const newUser = new Users();
      newUser.username = profile.displayName;
      newUser.role = 'User';
      newUser.email.push(profile.email);
      newUser.appleId = profile.id;
      const token = await generateAuthToken(newUser);
      await newUser.save();
      return res.redirect(process.env.CLIENT_URL + `/home/?SignupByApple=true&&user=${token}`);
    } else {
      const token = await generateAuthToken(user);
      return res.redirect(process.env.CLIENT_URL + `/home/?SignupByApple=true&&user=${token}`);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * Forgot password
 * @param {object} req
 * @param {object} res
 */
exports.forgot = async (req, res) => {
  try {
    let { email } = req.params;
    let user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Generating random password
    let randomPassword = Math.random().toString(36).slice(-8);

    // Sending email to user
    sendEmail(email, randomPassword)
      .then(async () => {
        // If email is sent then we have to update the password in db
        user.password = await bcrypt.hash(randomPassword, parseInt(bcryptSalt));
        await user.save();

        // Done
        res.json({ success: true, message: 'Email sent successfully' });
      })
      .catch((err) => {
        // Error handling
        // eslint-disable-next-line no-console
        console.log('Error ----> ', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
      });
  } catch (err) {
    // Error handling
    // eslint-disable-next-line no-console
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Confirm auth
 * @param {object} req
 * @param {object} res
 */
exports.confirmAuth = async (req, res) => {
  // If user authenticated
  res.json({ success: true, user: req.user });
};
