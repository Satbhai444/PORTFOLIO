import mongoose from 'mongoose';

const guestbookEntrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters'],
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [500, 'Message cannot exceed 500 characters'],
  },
  isApproved: {
    type: Boolean,
    default: true, // Auto-approve; admin can moderate later
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Index for efficient querying
guestbookEntrySchema.index({ timestamp: -1 });
guestbookEntrySchema.index({ isApproved: 1, timestamp: -1 });

export default mongoose.model('GuestbookEntry', guestbookEntrySchema);
