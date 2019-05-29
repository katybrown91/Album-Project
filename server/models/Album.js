const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = new mongoose.Schema({
  
  userId: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
  title: String,
  imageURL : String,
  description: String,
  pictures: {type: [{type: Schema.Types.ObjectId, ref: 'Picture'}]},
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;