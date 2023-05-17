// // const Users = require('../models/Users');
const Nft = require('../models/Nft');
const ListedItems = require('../models/ListedItems');

exports.create = async (req, res) => {
  try {
    let { nft, userId } = req.body;
    const existingNft = await Nft.findById(nft).populate('creator');
    if (!existingNft) {
      return res.status(404).json({ success: false, message: 'Nft not found' });
    }
    // eslint-disable-next-line no-console
    console.log('UserId', existingNft.owner);
    // eslint-disable-next-line no-console
    console.log('UserId', existingNft);
    if (userId !== existingNft.owner) {
      return res
        .status(403)
        .json({ success: false, message: 'This User cannot list this product' });
    }
    if (existingNft.listed === true) {
      return res.status(404).json({ success: false, message: 'Already Listed' });
    }
    const { type } = req.body;
    if (type === 'Fixed Price') {
      existingNft.listed = true;
      await existingNft.save();
    } else if (type === 'Timed Auction') {
      const { duration, method } = req.body;

      if (!duration) {
        return res.status(400).json({
          success: false,
          message: 'Duration is required for Timed Auction NFT',
        });
      }
      if (!method) {
        return res.status(400).json({
          success: false,
          message: 'Method is required for Timed Auction NFT',
        });
      }
      existingNft.listed = true;
      await existingNft.save();
    } else {
      return res.status(400).json({ success: false, message: 'Invalid NFT type' });
    }
    const listedItems = await ListedItems.create(req.body);
    await Nft.findByIdAndUpdate(nft, { $push: { bids: listedItems } }, { new: true });
    res.json({ listedItems, success: true }); // Success
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('first', err);
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
// exports.getListedItems = async (req, res) => {
//   try {
//     const {
//       category,
//       lth,
//       minPrice,
//       maxPrice,
//       recent,
//       // ...query
//     } = req.query;

//     let sortQuery = {};

//     if (recent) {
//       sortQuery['createdAt'] = recent;
//     }

//     if (lth) {
//       sortQuery['price'] = lth;
//     }

//     let filter = {};

//     if (category) {
//       filter.category = category;
//     }

//     if (minPrice && maxPrice) {
//       filter.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
//     } else if (minPrice || maxPrice) {
//       res.status(400).json({ success: false, message: 'Both minPrice and maxPrice are required' });
//       return;
//     }

//     const ListedItem = await ListedItems.find(filter)
//       .populate({
//         path: 'nft',
//         match: filter,
//       })
//       .populate('bids')
//       .sort(sortQuery);

//     const filteredListedItems = ListedItem.filter((item) => item.nft !== null);

//     res.json({ success: true, ListedItem: filteredListedItems });
//   } catch (err) {
//     // eslint-disable-next-line no-console
//     console.log('Error-->', err);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };
// exports.getListedItems = async (req, res) => {
//   try {
//     const {
//       category,
//       lth,
//       minPrice,
//       maxPrice,
//       recent,
//       topRated, // New parameter for top rated
//     } = req.query;

//     let sortQuery = {};

//     if (recent) {
//       sortQuery['createdAt'] = recent;
//     }

//     if (lth) {
//       sortQuery['price'] = lth;
//     }

//     let filter = {};

//     if (category) {
//       filter.category = category;
//     }

//     if (minPrice && maxPrice) {
//       filter.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
//     } else if (minPrice || maxPrice) {
//       res.status(400).json({ success: false, message: 'Both minPrice and maxPrice are required' });
//       return;
//     }

//     let pipeline = [
//       {
//         $lookup: {
//           from: 'bids',
//           localField: 'bids',
//           foreignField: '_id',
//           as: 'bids',
//         },
//       },
//       {
//         $addFields: {
//           numBids: { $size: '$bids' },
//         },
//       },
//       {
//         $sort: { numBids: -1 },
//       },
//     ];
//     if (category) {
//       pipeline = [
//         {
//           $lookup: {
//             from: 'bids',
//             localField: 'bids',
//             foreignField: '_id',
//             as: 'bids',
//           },
//         },
//         {
//           $addFields: {
//             numBids: { $size: '$bids' },
//           },
//         },
//         {
//           $match: { category: category },
//         },
//         {
//           $sort: { numBids: -1 },
//         },
//       ];
//     }

//     const ListedItem = await ListedItems.find(filter)
//       .sort(sortQuery)
//       .populate({
//         path: 'nft',
//         match: filter,
//       })
//       .sort(sortQuery)
//       .aggregate(pipeline);

//     const filteredListedItems = ListedItem.filter((item) => item.nft !== null);

//     res.json({ success: true, ListedItem: filteredListedItems });
//   } catch (err) {
//     console.log('Error-->', err);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };
exports.getListedItems = async (req, res) => {
  try {
    const {
      category,
      lth,
      minPrice,
      maxPrice,
      recent,
      // topRated, // New parameter for top rated
    } = req.query;

    let sortQuery = {};

    if (recent) {
      sortQuery['createdAt'] = recent;
    }

    if (lth) {
      sortQuery['price'] = lth;
    }

    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (minPrice && maxPrice) {
      filter.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
    } else if (minPrice || maxPrice) {
      res.status(400).json({ success: false, message: 'Both minPrice and maxPrice are required' });
      return;
    }

    let pipeline = [
      {
        $lookup: {
          from: 'bids',
          localField: 'bids',
          foreignField: '_id',
          as: 'bids',
        },
      },
      {
        $addFields: {
          numBids: { $size: '$bids' },
        },
      },
      {
        $sort: { numBids: -1 },
      },
    ];
    if (category) {
      pipeline = [
        {
          $lookup: {
            from: 'bids',
            localField: 'bids',
            foreignField: '_id',
            as: 'bids',
          },
        },
        {
          $addFields: {
            numBids: { $size: '$bids' },
          },
        },
        {
          $match: { category: category },
        },
        {
          $sort: { numBids: -1 },
        },
      ];
    }

    const ListedItem = await ListedItems.aggregate([
      { $match: filter },
      { $sort: sortQuery },
      { $lookup: { from: 'nfts', localField: 'nft', foreignField: '_id', as: 'nft' } },
      { $unwind: '$nft' },
      ...pipeline,
    ]);

    const filteredListedItems = ListedItem.filter((item) => item.nft !== null);

    res.json({ success: true, ListedItem: filteredListedItems });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Error-->', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.topRated = async (req, res) => {
  try {
    const ListedItem = await ListedItems.aggregate([
      {
        $lookup: {
          from: 'bids', // Assuming the collection name is 'bids'
          localField: 'bids',
          foreignField: '_id',
          as: 'bids',
        },
      },
      {
        $addFields: {
          numBids: { $size: '$bids' },
        },
      },
      {
        $sort: { numBids: -1 },
      },
    ]);

    const populatedListedItem = await ListedItems.populate(ListedItem, { path: 'nft' });

    res.json({ success: true, ListedItem: populatedListedItem }); // Success
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
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
    } else if (minPrice || maxPrice) {
      // Handle the case when only one of minPrice or maxPrice is provided
      res.status(400).json({ success: false, message: 'Both minPrice and maxPrice are required' });
      return;
    }
    const results = await ListedItems.find(filter).populate('bids nft').sort(sortQuery);
    res.json({ success: true, results }); // Success
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
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
