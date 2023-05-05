const Users = require('../models/Users');
const Nft = require('../models/Nft');
const bcrypt = require('bcryptjs');
const bcryptSalt = process.env.BCRYPT_SALT || 10;
const ListedItems = require('../models/ListedItems');

exports.create = async (req, res) => {
  try {
    let { nft, type, method, price, royalty, duration } = req.body; // Finding user by id
    const existingNft = await Nft.findById(nft);
    if (!existingNft) {
      return res.status(404).json({ success: false, message: 'Nft not found' });
    }
    //
    const listedItems = await ListedItems.create(req.body);
    const updatedNft = await Nft.findByIdAndUpdate(
      nft,
      { $push: { bids: listedItems } },
      { new: true },
    );
    res.json({ success: true, listedItems }); // Success
  } catch (err) {
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
exports.getById = async (req, res) => {
  try {
    const listedItemId = req.params.listedItemId; // Getting user id from URL parameter
    const bid = await ListedItems.findById(listedItemId); // Finding user by id
    if (!bid) {
      res.status(403).json({ success: false, message: 'Bid not found' });
    }
    res.json({ success: true, bid }); // Success
  } catch (err) {
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
exports.getAllBidByNFT = async (req, res) => {
  try {
    const nftId = req.params.nftId;
    if (!nftId) {
      res.status(403).json({ success: false, message: 'NFT Not Found' });
    }
    const bids = await ListedItems.find({ nft: nftId });
    if (bids.length === 0) {
      res.status(404).json({ success: false, message: 'No Bids found for this NFT' });
    } else {
      res.json({ success: true, bids, message: 'Bids fetched successfully' });
    }
  } catch (err) {
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
