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
      enum: ['Ethereum1', 'Ethereum2'],
      default: 'Ethereum1',
    },
    metadata: {
      type: String,
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
// module.exports = mongoose.model('nft', nftSchema);
module.exports = mongoose.model('nft', nftSchema);
