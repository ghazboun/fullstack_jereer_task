const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },

  text: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// eslint-disable-next-line no-undef
module.exports = Post = mongoose.model('Post', postSchema);
