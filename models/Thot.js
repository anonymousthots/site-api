const mongoose = require('mongoose');

const ThotSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Virtual for this thot instance URL.
ThotSchema
  .virtual('url')
  .get(() => {
    return '/thot/' + this._id;
  });

module.exports = mongoose.model('User', ThotSchema);