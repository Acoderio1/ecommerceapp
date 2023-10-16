const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  }
}, {timestamps: true})

module.exports = mongoose.model('AuthModel', authSchema)