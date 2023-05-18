const Users = require('../models/Users');
const Nft = require('../models/Nft');
// const bcrypt = require('bcryptjs');
// const bcryptSalt = process.env.BCRYPT_SALT || 10;

exports.create = async (req, res) => {
  try {
    let { user } = req.body;
    const existingUser = await Users.findById(user);
    if (!existingUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (!req.file) {
      res.status(403).json({ success: false, message: 'Please select your Files' });
    } else {
      req.body.doc = req.file.path;
    }
    req.body.owner = user;
    req.body.creator = user;
    const nft = await Nft.create(req.body);
    res.json({ success: true, nft, message: 'Your Nft has been created successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
exports.update = async (req, res) => {
  try {
    const { nftId } = req.params;
    if (!nftId) {
      res.json({ success: false, message: 'Please enter the Id' });
    }
    const Nft = await Nft.findByIdAndUpdate(nftId, req.body, {
      new: true,
    }); // Updating the User
    res.json({ success: true, Nft }); // Success
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getAllByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await Users.findById(userId);
    if (!user) {
      res.status(403).json({ success: false, message: 'User Not Found' });
    }
    const nfts = await Nft.find({ user: userId }); // Find all NFTs where the user field matches the specified user ID

    if (nfts.length === 0) {
      res.status(404).json({ success: false, message: 'No NFTs found for this user' });
    } else {
      res.json({ success: true, nfts, message: 'NFTs fetched successfully' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getNfts = async (req, res) => {
  try {
    const Nfts = await Nft.find(req.query)
      .populate('creator')
      .populate('owner')
      .sort({ createdAt: -1 });

    res.json({ success: true, Nfts }); // Success
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server' });
  }
};
exports.getAll = async (req, res) => {
  try {
    let sortQuery = {};
    const { recent } = req.query;

    if (recent) {
      sortQuery['createdAt'] = recent;
    }
    const results = await Nft.find().populate('owner');
    res.json({ success: true, results }); // Success
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('first', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
