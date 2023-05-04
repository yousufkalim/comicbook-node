/**
 * User schema
 * @author Yousuf Kalim
 */
const mongoose = require('mongoose');

// Schema
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  
    role: {
      type: String,
      enum: ['user'],
      default: 'user',
    },
    address: String,
    city: String,
    country: String,
    photo: String,
  },
  {
    timestamps: true,
  },
);

// Model
module.exports = mongoose.model('users', userSchema);
