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
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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

module.exports = mongoose.model('Thot', ThotSchema);