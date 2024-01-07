const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authSchema = new Schema({
  _id: {
    type: String
  },
  fullName: {
    type: String,
    required: true
  },
  emailId: {
    type: String,
    required: true
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId, ref: 'CartModel',
  }
}, {timestamps: true})

module.exports = mongoose.model('AuthModel', authSchema)