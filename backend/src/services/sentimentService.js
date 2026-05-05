import Sentiment from 'sentiment';
import mongoose from 'mongoose';
import SentimentScore from '../models/SentimentScore.js';
import PrivacyAuditLog from '../models/PrivacyAuditLog.js';

const sentiment = new Sentiment();

// Emotion analysis using sentiment scores
const analyzeEmotions = (text, sentimentScore) => {
  const emotions = {
    joy: 0,
    trust: 0,
    fear: 0,
    surprise: 0,
    sadness: 0,
    anger: 0,
  };

  // Simple emotion detection based on keywords
  const joyWords = ['happy', 'great', 'awesome', 'excellent', 'love', 'wonderful', 'amazing'];
  const trustWords = ['trust', 'reliable', 'secure', 'safe', 'confident', 'believe'];
  const fearWords = ['afraid', 'scared', 'worried', 'anxious', 'concerned', 'fear'];
  const surpriseWords = ['wow', 'amazing', 'surprised', 'unexpected', 'shocking'];
  const sadnessWords = ['sad', 'unhappy', 'depressed', 'down', 'miserable', 'sorry'];
  const angerWords = ['angry', 'furious', 'mad', 'hate', 'disgusted', 'annoyed'];

  const lowerText = text.toLowerCase();

  emotions.joy = joyWords.filter(word => lowerText.includes(word)).length * 15;
  emotions.trust = trustWords.filter(word => lowerText.includes(word)).length * 15;
  emotions.fear = fearWords.filter(word => lowerText.includes(word)).length * 15;
  emotions.surprise = surpriseWords.filter(word => lowerText.includes(word)).length * 15;
  emotions.sadness = sadnessWords.filter(word => lowerText.includes(word)).length * 15;
  emotions.anger = angerWords.filter(word => lowerText.includes(word)).length * 15;

  // Normalize emotions based on sentiment score
  if (sentimentScore > 0) {
    emotions.joy = Math.min(100, emotions.joy + sentimentScore);
    emotions.sadness = Math.max(0, emotions.sadness - sentimentScore);
  } else {
    emotions.sadness = Math.min(100, emotions.sadness + Math.abs(sentimentScore));
    emotions.joy = Math.max(0, emotions.joy - Math.abs(sentimentScore));
  }

  return emotions;
};

// Analyze message and return sentiment score
export const analyzeMessage = (text) => {
  try {
    const result = sentiment.analyze(text);
    // Normalize to -100 to +100 scale
    const normalizedScore = Math.max(-100, Math.min(100, result.score * 10));
    const emotions = analyzeEmotions(text, normalizedScore);

    return {
      score: Math.round(normalizedScore),
      emotions,
      comparative: result.comparative,
    };
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    return {
      score: 0,
      emotions: {
        joy: 0,
        trust: 0,
        fear: 0,
        surprise: 0,
        sadness: 0,
        anger: 0,
      },
      comparative: 0,
    };
  }
};

// Store sentiment score (privacy tunnel: raw message is deleted)
export const storeSentimentScore = async (communityId, messageText, channel = 'general') => {
  try {
    const analysis = analyzeMessage(messageText);
    const now = new Date();

    const sentimentScore = new SentimentScore({
      communityId,
      score: analysis.score,
      emotions: analysis.emotions,
      channel,
      hour: now.getHours(),
      day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][now.getDay()],
    });

    await sentimentScore.save();

    // Log to privacy audit
    await PrivacyAuditLog.create({
      communityId,
      action: 'message_analyzed',
      score: analysis.score,
      channel,
      status: 'success',
      rawMessageDeleted: true,
    });

    // Message text is NOT stored - privacy tunnel in action
    return sentimentScore;
  } catch (error) {
    console.error('Error storing sentiment score:', error);
    throw error;
  }
};

// Get sentiment timeline for a community
export const getSentimentTimeline = async (communityId, hours = 24) => {
  try {
    const now = new Date();
    const startTime = new Date(now.getTime() - hours * 60 * 60 * 1000);
    const oid = new mongoose.Types.ObjectId(communityId);

    const scores = await SentimentScore.aggregate([
      {
        $match: {
          communityId: oid,
          timestamp: { $gte: startTime },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d %H:00', date: '$timestamp' },
          },
          avgScore: { $avg: '$score' },
          count: { $sum: 1 },
          totalMessages: { $sum: '$messageCount' },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    return scores.map(item => ({
      time: item._id.split(' ')[1],
      score: Math.round(item.avgScore),
      volume: item.totalMessages,
    }));
  } catch (error) {
    console.error('Error getting sentiment timeline:', error);
    throw error;
  }
};

// Get emotion breakdown
export const getEmotionBreakdown = async (communityId, hours = 24) => {
  try {
    const now = new Date();
    const startTime = new Date(now.getTime() - hours * 60 * 60 * 1000);
    const oid = new mongoose.Types.ObjectId(communityId);

    const emotions = await SentimentScore.aggregate([
      {
        $match: {
          communityId: oid,
          timestamp: { $gte: startTime },
        },
      },
      {
        $group: {
          _id: null,
          joy: { $avg: '$emotions.joy' },
          trust: { $avg: '$emotions.trust' },
          fear: { $avg: '$emotions.fear' },
          surprise: { $avg: '$emotions.surprise' },
          sadness: { $avg: '$emotions.sadness' },
          anger: { $avg: '$emotions.anger' },
        },
      },
    ]);

    if (emotions.length === 0) {
      return [
        { emotion: 'Joy', value: 0 },
        { emotion: 'Trust', value: 0 },
        { emotion: 'Surprise', value: 0 },
        { emotion: 'Sadness', value: 0 },
        { emotion: 'Fear', value: 0 },
        { emotion: 'Anger', value: 0 },
      ];
    }

    const e = emotions[0];
    return [
      { emotion: 'Joy', value: Math.round(e.joy) },
      { emotion: 'Trust', value: Math.round(e.trust) },
      { emotion: 'Surprise', value: Math.round(e.surprise) },
      { emotion: 'Sadness', value: Math.round(e.sadness) },
      { emotion: 'Fear', value: Math.round(e.fear) },
      { emotion: 'Anger', value: Math.round(e.anger) },
    ];
  } catch (error) {
    console.error('Error getting emotion breakdown:', error);
    throw error;
  }
};

// Get hourly activity heatmap
export const getActivityHeatmap = async (communityId) => {
  try {
    const now = new Date();
    const startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const oid = new mongoose.Types.ObjectId(communityId);

    const hourlyData = await SentimentScore.aggregate([
      {
        $match: {
          communityId: oid,
          timestamp: { $gte: startTime },
        },
      },
      {
        $group: {
          _id: '$hour',
          volume: { $sum: '$messageCount' },
          avgSentiment: { $avg: '$score' },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Fill in missing hours
    const heatmap = [];
    for (let hour = 0; hour < 24; hour++) {
      const found = hourlyData.find(h => h._id === hour);
      heatmap.push({
        hour: String(hour).padStart(2, '0'),
        volume: found ? found.volume : 0,
        avgSentiment: found ? Math.round(found.avgSentiment) : 0,
      });
    }

    return heatmap;
  } catch (error) {
    console.error('Error getting activity heatmap:', error);
    throw error;
  }
};

// Get current mood score
export const getCurrentMoodScore = async (communityId) => {
  try {
    const oid = new mongoose.Types.ObjectId(communityId);

    // Try last hour first, then fall back to last 24h
    for (const hours of [1, 24]) {
      const startTime = new Date(Date.now() - hours * 60 * 60 * 1000);
      const result = await SentimentScore.aggregate([
        { $match: { communityId: oid, timestamp: { $gte: startTime } } },
        { $group: { _id: null, avgScore: { $avg: '$score' }, count: { $sum: 1 } } },
      ]);
      if (result.length > 0) return Math.round(result[0].avgScore);
    }
    return 0;
  } catch (error) {
    console.error('Error getting current mood score:', error);
    throw error;
  }
};

// Get privacy audit log
export const getPrivacyAuditLog = async (communityId, limit = 10) => {
  try {
    const oid = new mongoose.Types.ObjectId(communityId);
    const logs = await PrivacyAuditLog.find({ communityId: oid })
      .sort({ timestamp: -1 })
      .limit(limit)
      .lean();

    return logs.map(log => ({
      timestamp: log.timestamp.toLocaleTimeString(),
      score: log.score || 0,
      channel: log.channel,
      status: log.rawMessageDeleted ? 'DELETED ✓' : 'FAILED',
    }));
  } catch (error) {
    console.error('Error getting privacy audit log:', error);
    throw error;
  }
};
