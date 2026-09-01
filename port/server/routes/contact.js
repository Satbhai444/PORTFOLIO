import express from 'express';
import ContactMessage from '../models/ContactMessage.js';
import { sendContactEmail } from '../utils/sendEmail.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

/**
 * POST /api/contact
 * Submit a contact form message (public)
 * Saves to DB + sends email notification
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required',
      });
    }

    // Save to database
    const contact = await ContactMessage.create({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    // Send email notification (non-blocking — don't fail if email fails)
    const emailSent = await sendContactEmail({ name, email, message });

    if (emailSent) {
      contact.emailSent = true;
      await contact.save();
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully!',
      data: { id: contact._id },
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    console.error('Contact form error:', error);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
});

/**
 * GET /api/contact
 * Fetch all contact messages (admin only)
 */
router.get('/', authMiddleware, async (req, res) => {
  try {
    const messages = await ContactMessage.find()
      .sort({ timestamp: -1 })
      .lean();

    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch messages' });
  }
});

/**
 * PATCH /api/contact/:id/read
 * Toggle read status (admin only)
 */
router.patch('/:id/read', authMiddleware, async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    message.isRead = !message.isRead;
    await message.save();

    res.json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update message' });
  }
});

/**
 * DELETE /api/contact/:id
 * Delete a contact message (admin only)
 */
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    res.json({ success: true, message: 'Contact message deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete message' });
  }
});

export default router;
