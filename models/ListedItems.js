const mongoose = require('mongoose');

// Schema
const listedItems = new mongoose.Schema(
  {
    nftId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'nft',
      // required: true,
    },

    type: {
      type: String,
      enum: ['Fixed Price', 'Timed Auction'],
      default: 'Timed Auction',
    },
    method: {
      type: String,
    },
    price: {
      type: String,
    },
    royalty: {
      type: String,
    },
    duration: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// Model
module.exports = mongoose.model('listedItems', listedItems);
