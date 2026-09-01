import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authMiddleware from '../middleware/auth.js';
import GuestbookEntry from '../models/GuestbookEntry.js';
import ContactMessage from '../models/ContactMessage.js';

const router = express.Router();

/**
 * POST /api/admin/login
 * Admin login — returns JWT token
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required',
      });
    }

    // Check against environment credentials
    const validUsername = process.env.ADMIN_USERNAME || 'admin';
    const validPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (username !== validUsername || password !== validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

/**
 * GET /api/admin/verify
 * Verify if a token is still valid
 */
router.get('/verify', authMiddleware, (req, res) => {
  res.json({ success: true, admin: req.admin });
});

/**
 * GET /api/admin/dashboard
 * Dashboard statistics (admin only)
 */
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const [
      totalGuestbook,
      approvedGuestbook,
      pendingGuestbook,
      totalContacts,
      unreadContacts,
    ] = await Promise.all([
      GuestbookEntry.countDocuments(),
      GuestbookEntry.countDocuments({ isApproved: true }),
      GuestbookEntry.countDocuments({ isApproved: false }),
      ContactMessage.countDocuments(),
      ContactMessage.countDocuments({ isRead: false }),
    ]);

    // Recent activity (last 5 of each)
    const [recentGuestbook, recentContacts] = await Promise.all([
      GuestbookEntry.find().sort({ timestamp: -1 }).limit(5).lean(),
      ContactMessage.find().sort({ timestamp: -1 }).limit(5).lean(),
    ]);

    res.json({
      success: true,
      data: {
        stats: {
          totalGuestbook,
          approvedGuestbook,
          pendingGuestbook,
          totalContacts,
          unreadContacts,
        },
        recentGuestbook,
        recentContacts,
      },
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ success: false, message: 'Failed to load dashboard' });
  }
});

export default router;
