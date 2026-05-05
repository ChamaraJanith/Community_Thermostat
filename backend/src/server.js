import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import sentimentRoutes from './routes/sentimentRoutes.js';
import communityRoutes from './routes/communityRoutes.js';
import botRoutes from './routes/botRoutes.js';
import { startTelegramBot } from './services/telegramBotService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB then start bots
connectDB().then(() => {
  startTelegramBot();
});

// Routes
app.use('/api/sentiment', sentimentRoutes);
app.use('/api/communities', communityRoutes);
app.use('/api/bot', botRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Community Thermostat Backend is running',
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API Documentation:`);
  console.log(`   GET  /api/health - Health check`);
  console.log(`   GET  /api/communities - Get all communities`);
  console.log(`   POST /api/communities - Create community`);
  console.log(`   GET  /api/sentiment/timeline/:communityId - Get sentiment timeline`);
  console.log(`   GET  /api/sentiment/emotions/:communityId - Get emotion breakdown`);
  console.log(`   GET  /api/sentiment/heatmap/:communityId - Get activity heatmap`);
  console.log(`   GET  /api/sentiment/mood/:communityId - Get current mood`);
  console.log(`   GET  /api/sentiment/audit/:communityId - Get privacy audit log`);
  console.log(`   POST /api/sentiment/analyze - Analyze message`);
  console.log(`   GET  /api/sentiment/kpi/:communityId - Get KPI data`);
  console.log(`   GET  /api/bot/status - Telegram bot status`);
  console.log(`   POST /api/bot/start  - Start Telegram bot`);
  console.log(`   POST /api/bot/stop   - Stop Telegram bot`);
});

export default app;
