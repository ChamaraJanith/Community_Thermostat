import mongoose from 'mongoose';

const privacyAuditLogSchema = new mongoose.Schema(
  {
    communityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Community',
      required: true,
      index: true,
    },
    action: {
      type: String,
      enum: ['message_analyzed', 'message_deleted', 'score_stored', 'data_encrypted'],
      required: true,
    },
    score: {
      type: Number,
      min: -100,
      max: 100,
    },
    channel: {
      type: String,
      default: 'general',
    },
    status: {
      type: String,
      enum: ['success', 'failed'],
      default: 'success',
    },
    rawMessageDeleted: {
      type: Boolean,
      default: true,
    },
    encryptionMethod: {
      type: String,
      default: 'AES-256',
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
);

privacyAuditLogSchema.index({ communityId: 1, timestamp: -1 });

export default mongoose.model('PrivacyAuditLog', privacyAuditLogSchema);
