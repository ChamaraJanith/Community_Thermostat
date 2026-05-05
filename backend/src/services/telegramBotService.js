import TelegramBot from 'node-telegram-bot-api';
import { storeSentimentScore } from './sentimentService.js';
import Community from '../models/Community.js';

let bot = null;
let isRunning = false;

// Map to track which communities are linked to which Telegram chats
// Key: chatId (string), Value: communityId (string)
const chatCommunityMap = new Map();

/**
 * Initialize and start the Telegram bot
 */
export const startTelegramBot = async () => {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    console.log('⚠️  TELEGRAM_BOT_TOKEN not set — Telegram bot disabled');
    return null;
  }

  if (isRunning && bot) {
    console.log('ℹ️  Telegram bot already running');
    return bot;
  }

  try {
    bot = new TelegramBot(token, { polling: true });
    isRunning = true;

    console.log('🤖 Telegram bot started successfully');

    // ─── Command: /start ───────────────────────────────────────────────
    bot.onText(/\/start/, async (msg) => {
      const chatId = msg.chat.id;
      const chatTitle = msg.chat.title || msg.chat.username || 'this chat';

      await bot.sendMessage(
        chatId,
        `🌡️ *Community Thermostat Bot*\n\n` +
        `Hello! I'm now monitoring *${chatTitle}* for sentiment analysis.\n\n` +
        `📊 All messages are analyzed and immediately deleted — only the mood score is stored.\n\n` +
        `*Commands:*\n` +
        `/link — Link this chat to a community\n` +
        `/status — Show current mood score\n` +
        `/privacy — View privacy policy\n` +
        `/stop — Stop monitoring this chat`,
        { parse_mode: 'Markdown' }
      );

      // Auto-register this chat as a community if not already linked
      await autoRegisterChat(chatId, msg.chat);
    });

    // ─── Command: /link ────────────────────────────────────────────────
    bot.onText(/\/link (.+)/, async (msg, match) => {
      const chatId = msg.chat.id;
      const chatIdStr = String(chatId);
      const communityName = match[1].trim();

      try {
        // Check if this chat already has a community linked (from /start auto-register)
        const existingByChatId = await Community.findOne({ telegramChatId: chatIdStr });

        if (existingByChatId) {
          // Rename the existing community to the requested name
          existingByChatId.name = communityName;
          existingByChatId.description = `Telegram group: ${msg.chat.title || communityName}`;
          await existingByChatId.save();
          chatCommunityMap.set(chatIdStr, String(existingByChatId._id));
          await bot.sendMessage(
            chatId,
            `✅ Community renamed and linked as *"${communityName}"*\n🔒 Privacy Tunnel is active.`,
            { parse_mode: 'Markdown' }
          );
          return;
        }

        // Check if a community with this name already exists (different chat)
        const existingByName = await Community.findOne({ name: communityName });

        if (existingByName) {
          // Link this chat to the existing named community
          existingByName.telegramChatId = chatIdStr;
          await existingByName.save();
          chatCommunityMap.set(chatIdStr, String(existingByName._id));
          await bot.sendMessage(
            chatId,
            `✅ Linked to existing community *"${communityName}"*\n🔒 Privacy Tunnel is active.`,
            { parse_mode: 'Markdown' }
          );
          return;
        }

        // Create a brand new community
        const community = await Community.create({
          name: communityName,
          platform: 'telegram',
          description: `Telegram group: ${msg.chat.title || communityName}`,
          telegramChatId: chatIdStr,
          isActive: true,
        });
        chatCommunityMap.set(chatIdStr, String(community._id));
        await bot.sendMessage(
          chatId,
          `✅ Created and linked community *"${communityName}"*\n🔒 Privacy Tunnel is active.`,
          { parse_mode: 'Markdown' }
        );
      } catch (err) {
        console.error('Error linking community:', err);
        await bot.sendMessage(chatId, '❌ Failed to link community. Please try again.');
      }
    });

    // ─── Command: /status ──────────────────────────────────────────────
    bot.onText(/\/status/, async (msg) => {
      const chatId = String(msg.chat.id);
      const communityId = chatCommunityMap.get(chatId);

      if (!communityId) {
        await bot.sendMessage(
          msg.chat.id,
          '⚠️ This chat is not linked to a community yet.\nUse `/link <community name>` to get started.',
          { parse_mode: 'Markdown' }
        );
        return;
      }

      try {
        const { getCurrentMoodScore } = await import('./sentimentService.js');
        const score = await getCurrentMoodScore(communityId);
        const emoji = score >= 30 ? '🟢' : score >= -30 ? '🟡' : '🔴';
        const label = score >= 30 ? 'Thriving' : score >= -30 ? 'Neutral' : 'Tense';

        await bot.sendMessage(
          msg.chat.id,
          `📊 *Current Mood Score*\n\n${emoji} *${score}* — ${label}\n\n_Based on the last hour of messages_`,
          { parse_mode: 'Markdown' }
        );
      } catch (err) {
        await bot.sendMessage(msg.chat.id, '❌ Could not fetch mood score.');
      }
    });

    // ─── Command: /privacy ─────────────────────────────────────────────
    bot.onText(/\/privacy/, async (msg) => {
      await bot.sendMessage(
        msg.chat.id,
        `🔒 *Privacy Policy*\n\n` +
        `• Raw messages are analyzed instantly and *never stored*\n` +
        `• Only the sentiment score (-100 to +100) is saved\n` +
        `• No usernames, message content, or personal data is retained\n` +
        `• You can verify this in the Privacy Audit Log on the dashboard`,
        { parse_mode: 'Markdown' }
      );
    });

    // ─── Command: /stop ────────────────────────────────────────────────
    bot.onText(/\/stop/, async (msg) => {
      const chatId = String(msg.chat.id);
      chatCommunityMap.delete(chatId);
      await bot.sendMessage(
        msg.chat.id,
        '🛑 Monitoring stopped for this chat. Use /start to resume.'
      );
    });

    // ─── Listen to all regular messages ───────────────────────────────
    bot.on('message', async (msg) => {
      // Skip commands
      if (!msg.text || msg.text.startsWith('/')) return;

      const chatId = String(msg.chat.id);
      let communityId = chatCommunityMap.get(chatId);

      // If not linked yet, try to find by telegramChatId in DB
      if (!communityId) {
        const community = await Community.findOne({ telegramChatId: chatId });
        if (community) {
          communityId = String(community._id);
          chatCommunityMap.set(chatId, communityId);
        } else {
          // Auto-register silently
          const registered = await autoRegisterChat(msg.chat.id, msg.chat);
          if (registered) {
            communityId = String(registered._id);
            chatCommunityMap.set(chatId, communityId);
          } else {
            return; // Can't process without a community
          }
        }
      }

      try {
        // 🔒 Privacy Tunnel: analyze then discard the message
        const channel = msg.chat.title
          ? `#${msg.chat.title.toLowerCase().replace(/\s+/g, '-')}`
          : '#general';

        await storeSentimentScore(communityId, msg.text, channel);

        // Raw message is now gone — only the score was stored
        console.log(
          `📨 [Telegram] Chat ${chatId} | Score stored | Raw: DELETED ✓`
        );
      } catch (err) {
        console.error('Error processing Telegram message:', err.message);
      }
    });

    // ─── Error handling ────────────────────────────────────────────────
    bot.on('polling_error', (error) => {
      console.error('❌ Telegram polling error:', error.message);
      if (error.code === 'ETELEGRAM' && error.message.includes('401')) {
        console.error('🔑 Invalid bot token — please check TELEGRAM_BOT_TOKEN in .env');
        stopTelegramBot();
      }
    });

    return bot;
  } catch (error) {
    console.error('❌ Failed to start Telegram bot:', error.message);
    isRunning = false;
    return null;
  }
};

/**
 * Auto-register a Telegram chat as a community
 */
const autoRegisterChat = async (chatId, chat) => {
  try {
    const chatIdStr = String(chatId);

    // Already linked by chatId?
    const existingByChatId = await Community.findOne({ telegramChatId: chatIdStr });
    if (existingByChatId) {
      chatCommunityMap.set(chatIdStr, String(existingByChatId._id));
      return existingByChatId;
    }

    const name = chat.title || chat.username || `Telegram-${chatId}`;

    // A community with this name already exists (different chat)?
    // Don't overwrite it — create with a unique suffix instead
    let finalName = name;
    const existingByName = await Community.findOne({ name });
    if (existingByName) {
      finalName = `${name}-${chatIdStr.slice(-4)}`;
    }

    const community = await Community.create({
      name: finalName,
      platform: 'telegram',
      description: `Auto-registered Telegram group`,
      telegramChatId: chatIdStr,
      isActive: true,
    });

    chatCommunityMap.set(chatIdStr, String(community._id));
    console.log(`✅ Auto-registered Telegram community: "${finalName}" (${chatId})`);
    return community;
  } catch (err) {
    if (err.code === 11000) {
      // Race condition — already exists, just fetch it
      const existing = await Community.findOne({ telegramChatId: String(chatId) });
      if (existing) {
        chatCommunityMap.set(String(chatId), String(existing._id));
        return existing;
      }
    }
    console.error('Error auto-registering chat:', err.message);
    return null;
  }
};

/**
 * Stop the Telegram bot
 */
export const stopTelegramBot = () => {
  if (bot && isRunning) {
    bot.stopPolling();
    isRunning = false;
    bot = null;
    console.log('🛑 Telegram bot stopped');
  }
};

/**
 * Get bot status
 */
export const getBotStatus = () => ({
  isRunning,
  linkedChats: chatCommunityMap.size,
  chats: Array.from(chatCommunityMap.entries()).map(([chatId, communityId]) => ({
    chatId,
    communityId,
  })),
});
