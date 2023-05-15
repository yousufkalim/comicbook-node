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
    previousOwners: [
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
    created: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: ['Art', 'Music', 'Video', 'Photography', 'Game', 'Audio'],
      default: 'Art',
    },
    blockchain: {
      type: String,
      enum: ['Ethereum1', 'Ethereum2', 'Polygon'],
      default: 'Ethereum1',
    },
  },
  {
    timestamps: true,
  },
);

// Model
module.exports = mongoose.model('nft', nftSchema);
