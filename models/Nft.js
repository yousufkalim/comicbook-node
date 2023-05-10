const mongoose = require('mongoose');

// Schema
const nftSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      // required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    owner: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    ],

    doc: {
      type: String,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
      // unique: true,
    },
    category: {
      type: String,
      enum: ['Art', 'Music', 'Video', 'Photography', 'Game', 'Audio'],
      default: 'Art',
    },
    properties: {
      type: String,
    },
    level: {
      type: String,
    },
    stats: {
      type: String,
    },
    blockchain: {
      type: String,
      enum: ['Ethereum1', 'Ethereum2', 'Polygon'],
      default: 'Ethereum1',
    },
    metadata: {
      type: String,
    },
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
      type: Number,
    },
    royalty: {
      type: String,
    },
    duration: {
      type: String,
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
module.exports = mongoose.model('nft', nftSchema);
