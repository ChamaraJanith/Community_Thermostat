import express from 'express';
import { getBotStatus, stopTelegramBot, startTelegramBot } from '../services/telegramBotService.js';

const router = express.Router();

// GET /api/bot/status — check if bot is running and which chats are linked
router.get('/status', (req, res) => {
  const status = getBotStatus();
  res.json({
    success: true,
    data: {
      telegram: status,
    },
  });
});

// POST /api/bot/start — start the bot (if stopped)
router.post('/start', async (req, res) => {
  try {
    const result = await startTelegramBot();
    if (result) {
      res.json({ success: true, message: 'Telegram bot started' });
    } else {
      res.status(500).json({ success: false, error: 'Failed to start bot — check TELEGRAM_BOT_TOKEN' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/bot/stop — stop the bot
router.post('/stop', (req, res) => {
  stopTelegramBot();
  res.json({ success: true, message: 'Telegram bot stopped' });
});

export default router;
