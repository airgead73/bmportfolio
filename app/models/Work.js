const mongoose = require('mongoose');
const slugify = require('slugify');

const WorkSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  mode: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    trim: true
  },
  material: {
    type: String,
    trim: true
  },
  desc: {
    type: String,
    default: 'Decription...',
    trim: true
  },
  slug: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

});

WorkSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true })
  next();
});

WorkSchema.pre('remove', { document: true }, async function (next) {
  await this.model('Photo').deleteMany({ work: this._id });
  next();
});

module.exports = mongoose.model('Work', WorkSchema);