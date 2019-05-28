const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  
  userId: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
  title: String,
  imageURL : String,
  description: String,
  pictures: Array,
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;