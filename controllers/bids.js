const Bids = require('../models/Bids');
const Nft = require('../models/Nft');
// // const bcrypt = require('bcryptjs');
// // const bcryptSalt = process.env.BCRYPT_SALT || 10;

exports.create = async (req, res) => {
  try {
    let { nft } = req.body;
    const existingNft = await Nft.findById(nft);
    if (!existingNft) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    const Bid = await Bids.create(req.body);
    await Nft.findByIdAndUpdate(nft, { $push: { bids: Bid } }, { new: true });
    res.json({ Bid, success: true }); // Success
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// exports.getAllByNft = async (req, res) => {
//   try {
//     const listedItemId = req.params.listedItemId;
//     const Item = await ListedItem.findById({ _id: listedItemId });
//     if (!Item) {
//       res.status(403).json({ success: false, message: 'NFT Not Found' });
//     }
//     const bids = await Bids.find(listedItem); // Find all NFTs where the user field matches the specified user ID

//     if (bids.length === 0) {
//       res.status(404).json({ success: false, message: 'No Bids found for this Listed Item' });
//     } else {
//       res.json({ success: true, nfts, message: 'Listed NFTs fetched successfully' });
//     }
//   } catch (err) {
//     console.log('Error ----->', err);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };
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
