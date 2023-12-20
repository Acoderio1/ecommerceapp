const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  type: {
    type: String,
    required: false
  },
  images: {
    type: [],
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
  description: {
    type: String,
    requried: true
  },
  bestseller: {
    type: Boolean,
    required: false
  },
  sale: {
    type: Boolean,
    required: false
  }
}, {timestamps: true})

module.exports = mongoose.model('ProductModel', productSchema)