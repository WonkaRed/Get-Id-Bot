const TelegramBot = require('node-telegram-bot-api');

// Bot token
const token = '8504566767:AAGI-YwqKDm9xR-6myh29-VEjMwPcMBLKdE';

// Create bot instance
const bot = new TelegramBot(token, { polling: true });

console.log('🤖 Get ID Bot is running...');

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = `
✨ *Welcome to Get ID Bot* ✨

Send /getids in any chat to retrieve ID information.

*Available in:*
• Private chats - Get your user ID
• Groups - Get group ID and your user ID
• Channels - Get channel ID

_Simple, fast, and reliable._
  `.trim();

  bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown' });
});

// Handle /getids command
bot.onText(/\/getids/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const chatType = msg.chat.type;

  let response = '';

  if (chatType === 'private') {
    // Private chat - show user ID
    response = `
┌─────────────────────┐
│   *Your User ID*    │
└─────────────────────┘

🆔 \`${userId}\`

_Tap to copy_
    `.trim();
  } else if (chatType === 'group' || chatType === 'supergroup') {
    // Group chat - show both group ID and user ID
    const groupName = msg.chat.title || 'This Group';
    response = `
┌─────────────────────┐
│   *Group Info*      │
└─────────────────────┘

📁 *Group:* ${groupName}
🆔 *Group ID:* \`${chatId}\`

👤 *Your User ID:* \`${userId}\`

_Tap to copy_
    `.trim();
  } else if (chatType === 'channel') {
    // Channel - show channel ID
    const channelName = msg.chat.title || 'This Channel';
    response = `
┌─────────────────────┐
│   *Channel Info*    │
└─────────────────────┘

📺 *Channel:* ${channelName}
🆔 *Channel ID:* \`${chatId}\`

_Tap to copy_
    `.trim();
  }

  bot.sendMessage(chatId, response, { parse_mode: 'Markdown' });
});

// Handle errors
bot.on('polling_error', (error) => {
  console.error('Polling error:', error.message);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down bot...');
  bot.stopPolling();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n👋 Shutting down bot...');
  bot.stopPolling();
  process.exit(0);
});
