const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  emailId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  sale: {
    type: Boolean,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model('CartModel', cartSchema)