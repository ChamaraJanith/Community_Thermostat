/**
 * Run this script to clear auto-registered Telegram communities
 * so you can start fresh with /link
 *
 * Usage: node src/scripts/resetTelegramCommunities.js
 */
import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import Community from '../models/Community.js';

dotenv.config();

await connectDB();

const result = await Community.deleteMany({ platform: 'telegram' });
console.log(`🗑️  Deleted ${result.deletedCount} Telegram community record(s)`);
console.log('✅ Clean slate — restart the server and use /link again');
process.exit(0);
