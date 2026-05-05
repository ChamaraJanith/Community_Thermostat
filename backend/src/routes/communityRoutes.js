import express from 'express';
import Community from '../models/Community.js';

const router = express.Router();

// Get all communities
router.get('/', async (req, res) => {
  try {
    const communities = await Community.find({ isActive: true }).lean();
    res.json({
      success: true,
      data: communities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get community by ID
router.get('/:id', async (req, res) => {
  try {
    const community = await Community.findById(req.params.id).lean();
    if (!community) {
      return res.status(404).json({
        success: false,
        error: 'Community not found',
      });
    }
    res.json({
      success: true,
      data: community,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Create community
router.post('/', async (req, res) => {
  try {
    const { name, description, platform, platformId, members } = req.body;

    if (!name || !platform || !platformId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }

    const community = new Community({
      name,
      description,
      platform,
      platformId,
      members: members || 0,
    });

    await community.save();
    res.status(201).json({
      success: true,
      data: community,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Update community
router.put('/:id', async (req, res) => {
  try {
    const community = await Community.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!community) {
      return res.status(404).json({
        success: false,
        error: 'Community not found',
      });
    }

    res.json({
      success: true,
      data: community,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
