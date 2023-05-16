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
      enum: ['Sell to high bider', 'Sell to Recent bider', 'None'],
      default: 'Sell to high bider',
    },
    price: {
      type: Number,
    },
    royalty: {
      type: Number,
      enum: [5, 10, 15],
      default: 5,
    },
    currency: {
      type: String,
      enum: ['Polygon', 'Bitcoin', 'Ethereum'],
      default: 'Ethereum',
    },
    duration: {
      type: Date,
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
