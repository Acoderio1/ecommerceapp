const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CartModel = require('../models/CartModel')

const authSchema = new Schema({
  emailId: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  cart: {
    type: {}
  }
}, {timestamps: true})

module.exports = mongoose.model('AuthModel', authSchema)