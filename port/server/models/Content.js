import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
    trim: true,
    enum: ['hero', 'about', 'projects', 'contact', 'footer', 'general'],
  },
  key: {
    type: String,
    required: true,
    trim: true,
  },
  value: {
    type: String,
    default: '',
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound unique index: section + key must be unique
contentSchema.index({ section: 1, key: 1 }, { unique: true });

// Update the timestamp before save
contentSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Content', contentSchema);
