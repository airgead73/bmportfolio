const mongoose = require('mongoose');
const { cloudinary } = require('../config/cloudinary');

const PhotoSchema = new mongoose.Schema({
  work: {
    type: mongoose.Schema.ObjectId,
    ref: 'Work'
  },
  title: {
    type: String,
    trim: true
  },
  public_id: {
    type: String,
    trim: true
  },
  original_file: {
    type: String,
    trim: true
  },  
  format: {
    type: String,
    trim: true
  }, 
  size: {
    type: String,
    trim: true
  }, 
  url_raw: {
    type: String,
    trim: true
  }, 
  url_copyright: {
    type: String,
    trim: true
  }, 
  url_thumbnail: {
    type: String,
    trim: true
  }, 
  width: {
    type: Number
  },  
  height: {
    type: Number
  },
  orientation: {
    type: String
  },     
  createdAt: {
    type: Date,
    default: Date.now
  }

});


module.exports = mongoose.model('Photo', PhotoSchema);