const mongoose = require('mongoose');

// Schema
const bids = new mongoose.Schema(
  {
    listedItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'listedItems',
      // required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    price: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// Model
module.exports = mongoose.model('bids', bids);
