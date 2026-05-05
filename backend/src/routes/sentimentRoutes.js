import express from 'express';
import {
  getSentimentTimeline,
  getEmotionBreakdown,
  getActivityHeatmap,
  getCurrentMoodScore,
  getPrivacyAuditLog,
  storeSentimentScore,
} from '../services/sentimentService.js';

const router = express.Router();

// Get sentiment timeline for a community
router.get('/timeline/:communityId', async (req, res) => {
  try {
    const { communityId } = req.params;
    const { hours = 24 } = req.query;

    const timeline = await getSentimentTimeline(communityId, parseInt(hours));
    res.json({
      success: true,
      data: timeline,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get emotion breakdown
router.get('/emotions/:communityId', async (req, res) => {
  try {
    const { communityId } = req.params;
    const { hours = 24 } = req.query;

    const emotions = await getEmotionBreakdown(communityId, parseInt(hours));
    res.json({
      success: true,
      data: emotions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get activity heatmap
router.get('/heatmap/:communityId', async (req, res) => {
  try {
    const { communityId } = req.params;

    const heatmap = await getActivityHeatmap(communityId);
    res.json({
      success: true,
      data: heatmap,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get current mood score
router.get('/mood/:communityId', async (req, res) => {
  try {
    const { communityId } = req.params;

    const score = await getCurrentMoodScore(communityId);
    res.json({
      success: true,
      data: { score },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get privacy audit log
router.get('/audit/:communityId', async (req, res) => {
  try {
    const { communityId } = req.params;
    const { limit = 10 } = req.query;

    const logs = await getPrivacyAuditLog(communityId, parseInt(limit));
    res.json({
      success: true,
      data: logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Analyze and store a message (webhook from Discord/Telegram bot)
router.post('/analyze', async (req, res) => {
  try {
    const { communityId, messageText, channel = 'general' } = req.body;

    if (!communityId || !messageText) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: communityId, messageText',
      });
    }

    const result = await storeSentimentScore(communityId, messageText, channel);
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get dashboard KPI data
router.get('/kpi/:communityId', async (req, res) => {
  try {
    const { communityId } = req.params;

    const [currentMood, timeline, auditLog] = await Promise.all([
      getCurrentMoodScore(communityId),
      getSentimentTimeline(communityId, 24),
      getPrivacyAuditLog(communityId, 10),
    ]);

    const totalMessages = timeline.reduce((sum, item) => sum + (item.volume || 0), 0);
    const peakHour = timeline.length > 0
      ? timeline.reduce((max, item) => (item.score > max.score ? item : max), timeline[0])
      : { time: '--:--', score: 0 };

    res.json({
      success: true,
      data: {
        currentMoodScore: currentMood,
        messagesAnalyzed: totalMessages,
        messagesLast24h: totalMessages,
        peakPositivityTime: peakHour.time || '00:00',
        peakPositivityScore: peakHour.score || 0,
        privacyStatus: 'Active',
        rawMessagesStored: 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
