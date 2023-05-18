const mongoose = require('mongoose');

// Schema
const nftSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
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
    listed: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: ['Art', 'Music', 'Video', 'Photography', 'Game', 'Audio'],
      default: 'Art',
    },
    // nft_Token: {
    //   type: String,
    //   required: true,
    // },
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
