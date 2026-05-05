/**
 * Seed realistic test data into your existing Telegram community
 * Preserves all existing communities and real Telegram messages
 *
 * Usage: npm run seed:test
 */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/database.js';
import Community from '../models/Community.js';
import SentimentScore from '../models/SentimentScore.js';
import PrivacyAuditLog from '../models/PrivacyAuditLog.js';

dotenv.config();

// ── Realistic message pool for simulation ─────────────────────────────────────
const positiveMessages = [
  "This community is absolutely amazing, love being here!",
  "Just shipped a new feature, feeling great about it!",
  "Great discussion today, learned so much from everyone",
  "The new update is fantastic, really well done team",
  "So happy to be part of this group, you're all awesome",
  "Incredible work everyone, this project is coming together",
  "Best community I've ever been in, super supportive",
  "Just hit a major milestone, couldn't have done it without you all",
  "Loving the energy here today, very productive session",
  "This is exactly what I needed, thank you so much!",
];

const neutralMessages = [
  "Anyone know when the next meeting is scheduled?",
  "Just checking in, how is everyone doing today?",
  "Working on the new feature, making some progress",
  "Can someone share the documentation link again?",
  "Reminder: standup is at 10am tomorrow",
  "Updated the repo, please pull the latest changes",
  "Looking into the issue, will update soon",
  "Has anyone tried the new API endpoint yet?",
  "Just joined the call, catching up on the thread",
  "Noted, will follow up on this later today",
];

const negativeMessages = [
  "Really frustrated with this bug, been stuck for hours",
  "The deployment failed again, this is getting annoying",
  "Not happy with how this was handled, very disappointing",
  "This is taking way too long, we need to fix the process",
  "Feeling overwhelmed with the workload right now",
  "The server is down again, this keeps happening",
  "I'm confused and a bit lost on the new requirements",
  "This update broke everything, really unhappy about it",
  "Struggling to keep up, need some help here",
  "Very concerned about the deadline, we're behind schedule",
];

// ── Sentiment score generator ──────────────────────────────────────────────────
const getScoreForHour = (hour) => {
  // Morning boost (8-11): positive
  if (hour >= 8 && hour <= 11) return rand(25, 75);
  // Lunch dip (12-13): neutral
  if (hour >= 12 && hour <= 13) return rand(-10, 30);
  // Afternoon frustration (14-16): negative
  if (hour >= 14 && hour <= 16) return rand(-50, 10);
  // Evening recovery (17-20): positive
  if (hour >= 17 && hour <= 20) return rand(20, 65);
  // Late night (21-23): neutral/low
  if (hour >= 21) return rand(-20, 20);
  // Early morning (0-7): low activity, mixed
  return rand(-15, 35);
};

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getEmotions = (score) => ({
  joy:      Math.max(0, Math.min(100, score > 0 ? rand(score, score + 40) : rand(0, 20))),
  trust:    Math.max(0, Math.min(100, rand(20, 70))),
  fear:     Math.max(0, Math.min(100, score < 0 ? rand(10, 40) : rand(0, 15))),
  surprise: Math.max(0, Math.min(100, rand(5, 35))),
  sadness:  Math.max(0, Math.min(100, score < -20 ? rand(20, 60) : rand(0, 20))),
  anger:    Math.max(0, Math.min(100, score < -30 ? rand(15, 50) : rand(0, 10))),
});

const channels = ['#general', '#dev-chat', '#announcements', '#support', '#random'];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// ── Main seed function ─────────────────────────────────────────────────────────
const seedTestData = async () => {
  await connectDB();

  // Find the Telegram community (the one your bot created)
  let community = await Community.findOne({ platform: 'telegram' });

  if (!community) {
    console.log('⚠️  No Telegram community found. Creating one...');
    community = await Community.create({
      name: 'My Telegram Community',
      platform: 'telegram',
      description: 'Test community with seeded data',
      telegramChatId: 'test_seed',
      isActive: true,
    });
  }

  console.log(`🎯 Seeding data for community: "${community.name}" (${community._id})`);

  // ── Generate 48 hours of data ──────────────────────────────────────────────
  const now = new Date();
  const scores = [];
  const auditLogs = [];

  for (let hoursAgo = 48; hoursAgo >= 0; hoursAgo--) {
    const timestamp = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);
    const hour = timestamp.getHours();
    const day = days[timestamp.getDay()];

    // More messages during active hours, fewer at night
    const isActiveHour = hour >= 8 && hour <= 22;
    const msgCount = isActiveHour ? rand(3, 12) : rand(0, 3);

    for (let i = 0; i < msgCount; i++) {
      // Spread messages within the hour
      const msgTime = new Date(timestamp.getTime() + rand(0, 59) * 60 * 1000);
      const score = Math.max(-100, Math.min(100, getScoreForHour(hour)));
      const channel = channels[rand(0, channels.length - 1)];

      scores.push({
        communityId: community._id,
        score,
        messageCount: 1,
        emotions: getEmotions(score),
        channel,
        timestamp: msgTime,
        hour,
        day,
      });

      auditLogs.push({
        communityId: community._id,
        action: 'message_analyzed',
        score,
        channel,
        status: 'success',
        rawMessageDeleted: true,
        timestamp: msgTime,
      });
    }
  }

  await SentimentScore.insertMany(scores);
  await PrivacyAuditLog.insertMany(auditLogs);

  console.log(`✅ Inserted ${scores.length} sentiment scores across 48 hours`);
  console.log(`✅ Inserted ${auditLogs.length} privacy audit log entries`);
  console.log(`\n📊 Community ID for dashboard: ${community._id}`);
  console.log(`\n🚀 Refresh your frontend — real data should now appear!`);

  process.exit(0);
};

seedTestData().catch((err) => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
