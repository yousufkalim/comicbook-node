const mongoose = require('mongoose');

// Schema
const nftSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      // required: true,
    },
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
    collect: {
      type: String,
      enum: ['collection1', 'collection2'],
      default: 'collection1',
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
    bids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'listedItems',
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Model
module.exports = mongoose.model('nft', nftSchema);
