const Bids = require('../models/Bids');
const ListedItems = require('../models/ListedItems');
// const Nft = require('../models/Nft');
const Nft = require('../models/Nft');
// // const bcrypt = require('bcryptjs');
// // const bcryptSalt = process.env.BCRYPT_SALT || 10;
exports.create = async (req, res) => {
  try {
    let { listedItem } = req.body;
    const existingItem = await ListedItems.findById(listedItem);
    if (!existingItem) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    const { type } = existingItem;

    if (type === 'Fixed Price') {
      return res
        .status(400)
        .json({ success: false, message: 'Bidding is not possible for this type' });
    }
    if (req.body.price < existingItem.price) {
      return res.status(400).json({
        success: false,
        message: 'Bid price cannot be less than the listed item price',
      });
    }

    const Bid = await Bids.create(req.body);
    await ListedItems.findByIdAndUpdate(listedItem, { $push: { bids: Bid } }, { new: true });

    res.json({ Bid, success: true }); // Success
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// exports.getBidsByNft = async (req, res) => {
//   try {
//     const nftId = req.params.nftId;
//     const Nft = await Nft.findById(nftId);
//     if (!Nft) {
//       return res.status(404).json({ success: false, message: 'Item not found' });
//     }
//     const bids = await Bids.find({ nft: nftId });
//     res.json({ success: true, bids });
//   } catch (err) {
//     console.log('Error---->', err);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };
exports.getById = async (req, res) => {
  try {
    const bidId = req.params.bidId; // Getting Bid id from URL parameter
    const Bid = await Bids.findById(bidId); // Finding Bid by id
    res.json({ success: true, Bid }); // Success
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getBidsByNft = async (req, res) => {
  try {
    const nftId = req.params.nftId;
    const Item = await Nft.findById({ _id: nftId });
    if (!Item) {
      res.status(403).json({ success: false, message: 'NFT Not Found' });
    }
    const bids = await Bids.find({ nft: nftId }).populate('userId'); // Find all NFTs where the user field matches the specified user ID

    if (bids.length === 0) {
      res.status(404).json({ success: false, message: 'No Bids found for this Listed Item' });
    } else {
      res.json({ success: true, bids, message: 'Bids fetched successfully' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
// // exports.getNfts = async (req, res) => {
// //   try {
// //     const Nfts = await Nft.find(req.query)
// //       .populate('user')
// //       .populate('owner')
// //       .populate('bids')
// //       .sort({ createdAt: -1 });

// //     res.json({ success: true, Nfts }); // Success
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: 'Internal server' });
// //   }
// // };
// // exports.price = async (req, res) => {
// //   try {
// //     const Nfts = await Nft.find(req.query)
// //       .populate('user')
// //       .populate('owner')
// //       .populate({
// //         path: 'bids',
// //         options: { sort: { price: 1 } }, // Sort bids by price in ascending order
// //       })
// //       .sort({ 'bids.price': 1 }); // Sort NFTs by the lowest bid price

// //     res.json({ success: true, Nfts }); // Success
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: 'Internal server' });
// //   }
// // };

// exports.getAll = async (req, res) => {
//   try {
//     const results = await Nft.find().populate('user').populate('bids').populate('owner'); // Finding all the beauticians from db
//     res.json({ success: true, results }); // Success
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };
