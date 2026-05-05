import mongoose from 'mongoose';

const communitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    platform: {
      type: String,
      enum: ['discord', 'telegram', 'slack'],
      required: true,
    },
    platformId: {
      type: String,
      unique: true,
      sparse: true, // allows null/undefined without unique conflict
    },
    telegramChatId: {
      type: String,
      unique: true,
      sparse: true,
    },
    members: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    privacyTunnelEnabled: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Community', communitySchema);
