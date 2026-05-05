import mongoose from 'mongoose';

const sentimentScoreSchema = new mongoose.Schema(
  {
    communityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Community',
      required: true,
      index: true,
    },
    score: {
      type: Number,
      required: true,
      min: -100,
      max: 100,
    },
    messageCount: {
      type: Number,
      default: 1,
    },
    emotions: {
      joy: { type: Number, default: 0 },
      trust: { type: Number, default: 0 },
      fear: { type: Number, default: 0 },
      surprise: { type: Number, default: 0 },
      sadness: { type: Number, default: 0 },
      anger: { type: Number, default: 0 },
    },
    channel: {
      type: String,
      default: 'general',
    },
    // Privacy: Raw message is NOT stored
    // Only metadata is kept
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
    hour: {
      type: Number,
      min: 0,
      max: 23,
    },
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    },
  },
  { timestamps: true }
);

// Index for efficient queries
sentimentScoreSchema.index({ communityId: 1, timestamp: -1 });
sentimentScoreSchema.index({ communityId: 1, hour: 1 });

export default mongoose.model('SentimentScore', sentimentScoreSchema);
