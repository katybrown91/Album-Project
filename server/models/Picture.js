const mongoose = require('mongoose');

const picSchema = new mongoose.Schema({
  
  userId: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
  imageURL : String,
  comments: Array,
  likes: Number,
  description: String,
  albumId: String,
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Picture = mongoose.model('Picture', picSchema);

module.exports = Picture;