// // const Users = require('../models/Users');
const Nft = require('../models/Nft');
const ListedItems = require('../models/ListedItems');

exports.create = async (req, res) => {
  try {
    let { nft } = req.body;
    const existingNft = await Nft.findById(nft);
    if (!existingNft) {
      return res.status(404).json({ success: false, message: 'Nft not found' });
    }
    req.body.listed = true;
    const listedItems = await ListedItems.create(req.body);
    await Nft.findByIdAndUpdate(nft, { $push: { bids: listedItems } }, { new: true });
    res.json({ listedItems, success: true }); // Success
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getById = async (req, res) => {
  try {
    const listedItemId = req.params.listedItemId;
    const listedItem = await ListedItems.findById(listedItemId).populate('nft').populate('bids');
    if (!listedItem) {
      res.status(403).json({ success: false, message: 'Listed item not found' });
    }
    res.json({ success: true, listedItem }); // Success
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
exports.getListedItems = async (req, res) => {
  try {
    const { category, ...query } = req.query; // Extract the category and other query parameters

    const nftQuery = category ? { category } : {}; // Create the query for the nft category

    const ListedItem = await ListedItems.find(query)
      .populate({
        path: 'nft',
        match: nftQuery, // Only populate nft objects with the specified category (if provided)
      })
      // .populate('owner')
      .populate('bids');

    const filteredListedItems = ListedItem.filter((item) => item.nft !== null); // Filter out ListedItems with null nft (no match for the specified category)

    res.json({ success: true, ListedItem: filteredListedItems }); // Success
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server' });
  }
};
exports.recommended = async (req, res) => {
  try {
    const ListedItem = await ListedItems.find()
      .populate('nft')
      .populate({
        path: 'bids',
        options: { sort: { createdAt: -1 }, limit: 1 }, // Sort bids in descending order of createdAt and limit to 1 (to get the highest bid)
      })
      .sort({ 'bids.length': -1 }); // Sort by the number of bids in descending order
    // .limit(16); // Limit the result to 16 NFTs

    res.json({ success: true, ListedItem }); // Success
  } catch (err) {
    // console.log('first', err);
    res.status(500).json({ success: false, message: 'Internal server' });
  }
};
exports.getAll = async (req, res) => {
  try {
    let sortQuery = {};
    const {
      recent,
      lth,
      minPrice,
      maxPrice,
      //rated, ...query
    } = req.query;

    if (recent) {
      sortQuery['createdAt'] = recent;
    }
    if (lth) {
      sortQuery['price'] = lth;
    }

    let filter = {};
    if (minPrice && maxPrice) {
      filter['price'] = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
    } else if (minPrice) {
      filter['price'] = { $gte: parseFloat(minPrice) };
    } else if (maxPrice) {
      filter['price'] = { $lte: parseFloat(maxPrice) };
    }

    const results = await ListedItems.find(filter).populate('bids nft').sort(sortQuery);
    res.json({ success: true, results }); // Success
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
// // exports.getAllBidByNFT = async (req, res) => {
// //   try {
// //     const nftId = req.params.nftId;
// //     if (!nftId) {
// //       res.status(403).json({ success: false, message: 'NFT Not Found' });
// //     }
// //     const bids = await ListedItems.find({ nft: nftId });
// //     if (bids.length === 0) {
// //       res.status(404).json({ success: false, message: 'No Bids found for this NFT' });
// //     } else {
// //       res.json({ success: true, bids, message: 'Bids fetched successfully' });
// //     }
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: 'Internal server error' });
// //   }
// // };
// exports.getAll = async (req, res) => {
//   try {
//     const results = await ListedItems.find().populate('nft');
//     res.json({ success: true, results }); // Success
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };
// // exports.buy = async (req, res) => {
// //   try {
// //     const { userId, listedItemId } = req.body;

// //     // Find the listed item by ID
// //     const existingListedItem = await ListedItems.findById(listedItemId);

// //     if (!existingListedItem) {
// //       return res.status(404).json({ success: false, message: 'Listed item not found' });
// //     }

// //     // Find the NFT by ID from the listed item model
// //     const existingNft = await Nft.findById(existingListedItem.nft._id).populate('owner');
// //     // const existingNft = '2134567890ghdahbf';
// //     if (!existingNft) {
// //       return res.status(404).json({ success: false, message: 'NFT not found' });
// //     }

// //     // Add the userId to the owners array
// //     existingNft.owner.push(userId);

// //     // Remove the sold listed item from the NFT's bids array
// //     existingNft.bids = existingNft.bids.filter((bid) => {
// //       return bid.toString() !== listedItemId.toString();
// //     });

// //     // Save the updated NFT and remove the sold listed item
// //     await Promise.all([existingNft.save(), existingListedItem.remove()]);

// //     res.json({ success: true, message: 'Congratulations' }); // Success
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: 'Internal server error' });
// //   }
// // };
