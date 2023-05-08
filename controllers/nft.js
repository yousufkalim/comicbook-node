const Users = require('../models/Users');
const Nft = require('../models/Nft');
const bcrypt = require('bcryptjs');
const bcryptSalt = process.env.BCRYPT_SALT || 10;

exports.create = async (req, res) => {
  try {
    let {
      user,
      name,
      description,
      category,
      properties,
      level,
      stats,
      blockchain,
      metadata,
      bids,
    } = req.body;
    const existingUser = await Users.findById(user);
    // if (!existingUser) {
    //   return res.status(404).json({ success: false, message: 'User not found' });
    // }
    // if (!existingUser.wallet_address) {
    //   return res.status(400).json({ success: false, message: 'Please Connect the wallet' });
    // }

    if (!req.file) {
      res.status(403).json({ success: false, message: 'Please select your Files' });
    } else {
      req.body.doc = req.file.path;
    }
    const nft = await Nft.create(req.body);
    res.json({ success: true, nft, message: 'Your Nft has been created successfully' });
  } catch (err) {
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
exports.getAllByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      res.status(403).json({ success: false, message: 'User Not Found' });
    }
    const nfts = await Nft.find({ user: userId }); // Find all NFTs where the user field matches the specified user ID

    if (nfts.length === 0) {
      res.status(404).json({ success: false, message: 'No NFTs found for this user' });
    } else {
      res.json({ success: true, nfts, message: 'NFTs fetched successfully' });
    }
  } catch (err) {
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getNfts = async (req, res) => {
  try {
    const Nfts = await Nft.find(req.query).populate('user');
    res.json({ success: true, Nfts }); // Success
  } catch (err) {
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const results = await Nft.find().populate('user'); // Finding all the beauticians from db
    res.json({ success: true, results }); // Success
  } catch (err) {
    // Error handling
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
