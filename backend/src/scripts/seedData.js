import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Community from '../models/Community.js';
import SentimentScore from '../models/SentimentScore.js';
import connectDB from '../config/database.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('🌱 Starting database seed...');

    // Clear existing data
    await Community.deleteMany({});
    await SentimentScore.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create communities
    const communities = await Community.insertMany([
      {
        name: 'Dev Community',
        description: 'A community for developers',
        platform: 'discord',
        platformId: 'discord_dev_123',
        members: 1247,
      },
      {
        name: 'Design Guild',
        description: 'Design and UX community',
        platform: 'discord',
        platformId: 'discord_design_456',
        members: 892,
      },
      {
        name: 'Product Team',
        description: 'Product management team',
        platform: 'telegram',
        platformId: 'telegram_product_789',
        members: 156,
      },
      {
        name: 'Marketing Hub',
        description: 'Marketing and growth community',
        platform: 'slack',
        platformId: 'slack_marketing_101',
        members: 423,
      },
    ]);

    console.log(`✅ Created ${communities.length} communities`);

    // Generate sentiment data for the last 24 hours
    const now = new Date();
    const sentimentData = [];

    for (let hour = 0; hour < 24; hour++) {
      const timestamp = new Date(now.getTime() - (24 - hour) * 60 * 60 * 1000);
      
      // Generate 5-10 messages per hour
      const messagesPerHour = Math.floor(Math.random() * 6) + 5;
      
      for (let i = 0; i < messagesPerHour; i++) {
        // Create realistic sentiment scores with a dip around 14:00-15:00
        let score;
        if (hour >= 14 && hour <= 15) {
          score = Math.floor(Math.random() * 40) - 25; // Negative scores
        } else if (hour >= 8 && hour <= 12) {
          score = Math.floor(Math.random() * 60) + 20; // Positive scores
        } else {
          score = Math.floor(Math.random() * 80) - 20; // Mixed scores
        }

        sentimentData.push({
          communityId: communities[0]._id,
          score: Math.max(-100, Math.min(100, score)),
          messageCount: 1,
          emotions: {
            joy: Math.max(0, Math.min(100, score + 50)),
            trust: Math.floor(Math.random() * 100),
            fear: Math.max(0, Math.min(100, -score + 30)),
            surprise: Math.floor(Math.random() * 50),
            sadness: Math.max(0, Math.min(100, -score + 20)),
            anger: Math.max(0, Math.min(100, -score + 10)),
          },
          channel: ['general', 'dev-chat', 'announcements', 'support'][Math.floor(Math.random() * 4)],
          timestamp,
          hour,
          day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][timestamp.getDay()],
        });
      }
    }

    await SentimentScore.insertMany(sentimentData);
    console.log(`✅ Created ${sentimentData.length} sentiment scores`);

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
