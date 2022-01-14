const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  countrycode: {
    type: String,
    required: true,
  },
  avatarcolor: {
    type: String,
    required: true,
  },
});

// eslint-disable-next-line no-undef
module.exports = User = mongoose.model('user', UserSchema);
