const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  album: Array
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },

    followers: Array,
    following: Array
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
