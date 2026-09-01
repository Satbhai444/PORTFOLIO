import express from 'express';
import Content from '../models/Content.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

/**
 * GET /api/content
 * Fetch all content entries (public)
 */
router.get('/', async (req, res) => {
  try {
    const content = await Content.find().lean();

    // Transform into a nested object: { section: { key: value } }
    const contentMap = {};
    content.forEach((item) => {
      if (!contentMap[item.section]) {
        contentMap[item.section] = {};
      }
      contentMap[item.section][item.key] = item.value;
    });

    res.json({ success: true, data: contentMap });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch content' });
  }
});

/**
 * GET /api/content/raw
 * Fetch all content as raw array (admin)
 */
router.get('/raw', authMiddleware, async (req, res) => {
  try {
    const content = await Content.find().sort({ section: 1, key: 1 }).lean();
    res.json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch content' });
  }
});

/**
 * PUT /api/content
 * Create or update a content entry (admin only)
 * Body: { section, key, value }
 */
router.put('/', authMiddleware, async (req, res) => {
  try {
    const { section, key, value } = req.body;

    if (!section || !key) {
      return res.status(400).json({
        success: false,
        message: 'Section and key are required',
      });
    }

    const content = await Content.findOneAndUpdate(
      { section, key },
      { value, updatedAt: Date.now() },
      { upsert: true, new: true, runValidators: true }
    );

    res.json({ success: true, data: content });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors).map((e) => e.message).join(', '),
      });
    }
    res.status(500).json({ success: false, message: 'Failed to update content' });
  }
});

/**
 * PUT /api/content/bulk
 * Bulk update multiple content entries (admin only)
 * Body: { entries: [{ section, key, value }, ...] }
 */
router.put('/bulk', authMiddleware, async (req, res) => {
  try {
    const { entries } = req.body;

    if (!Array.isArray(entries) || entries.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Entries array is required',
      });
    }

    const operations = entries.map(({ section, key, value }) => ({
      updateOne: {
        filter: { section, key },
        update: { value, updatedAt: Date.now() },
        upsert: true,
      },
    }));

    await Content.bulkWrite(operations);

    res.json({ success: true, message: `Updated ${entries.length} entries` });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to bulk update content' });
  }
});

/**
 * DELETE /api/content/:id
 * Delete a content entry (admin only)
 */
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);

    if (!content) {
      return res.status(404).json({ success: false, message: 'Content not found' });
    }

    res.json({ success: true, message: 'Content deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete content' });
  }
});

export default router;
