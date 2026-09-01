import express from 'express';
import GuestbookEntry from '../models/GuestbookEntry.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

/**
 * GET /api/guestbook
 * Fetch all approved guestbook messages (public)
 */
router.get('/', async (req, res) => {
  try {
    const messages = await GuestbookEntry.find({ isApproved: true })
      .sort({ timestamp: -1 })
      .lean();

    res.json({ success: true, data: messages });
  } catch (error) {
    console.error('Guestbook fetch error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch messages' });
  }
});

/**
 * GET /api/guestbook/all
 * Fetch ALL guestbook messages including unapproved (admin only)
 */
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const messages = await GuestbookEntry.find()
      .sort({ timestamp: -1 })
      .lean();

    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch messages' });
  }
});

/**
 * POST /api/guestbook
 * Add a new guestbook message (public)
 */
router.post('/', async (req, res) => {
  try {
    const { name, message } = req.body;

    if (!name?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name and message are required',
      });
    }

    const entry = await GuestbookEntry.create({
      name: name.trim(),
      message: message.trim(),
    });

    res.status(201).json({ success: true, data: entry });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    console.error('Guestbook create error:', error);
    res.status(500).json({ success: false, message: 'Failed to add message' });
  }
});

/**
 * DELETE /api/guestbook/:id
 * Delete a guestbook message (admin only)
 */
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const entry = await GuestbookEntry.findByIdAndDelete(req.params.id);

    if (!entry) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    res.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete message' });
  }
});

/**
 * PATCH /api/guestbook/:id/approve
 * Toggle approval status (admin only)
 */
router.patch('/:id/approve', authMiddleware, async (req, res) => {
  try {
    const entry = await GuestbookEntry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    entry.isApproved = !entry.isApproved;
    await entry.save();

    res.json({ success: true, data: entry });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update message' });
  }
});

export default router;
