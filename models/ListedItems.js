const mongoose = require('mongoose');

// Schema
const listedItems = new mongoose.Schema(
  {
    nft: {
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
    listed: {
      type: Boolean,
      default: false,
    },
    bids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bids',
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Model
module.exports = mongoose.model('listedItems', listedItems);
