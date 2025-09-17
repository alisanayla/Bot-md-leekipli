// index.js code here
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const { TELEGRAM_TOKEN } = require('./config');

// Database
let db = { users: {}, transactions: {}, jaserGroups: [], promosi: { text: "" } };
if(fs.existsSync('./database.json')) db = JSON.parse(fs.readFileSync('./database.json','utf8'));
const writeDB = () => fs.writeFileSync('./database.json', JSON.stringify(db,null,2));

// Init bot
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// Main menu
const mainMenu = {
  reply_markup: {
    inline_keyboard: [
      [{ text: '📄 Rekber', callback_data: 'rekber' }],
      [{ text: '🤖 AI', callback_data: 'ai' }],
      [{ text: '🎮 RPG', callback_data: 'rpg' }],
      [{ text: '🎉 Fun', callback_data: 'fun' }],
      [{ text: '🕵️ Jasher', callback_data: 'jasher' }],
      [{ text: '🔍 Stalking', callback_data: 'stalking' }],
      [{ text: '🔎 Search', callback_data: 'search' }],
      [{ text: '📺 Anime', callback_data: 'anime' }],
      [{ text: '💖 Support', callback_data: 'support' }]
    ]
  }
};

// Import semua menu
require('./menus/rekber')(bot, db, writeDB);
require('./menus/fun')(bot, db, writeDB);
require('./menus/ai')(bot, db, writeDB);
require('./menus/rpg')(bot, db, writeDB);
require('./menus/tebak')(bot, db, writeDB);
require('./menus/jasher')(bot, db, writeDB);
require('./menus/stalking')(bot, db, writeDB);
require('./menus/search')(bot, db, writeDB);
require('./menus/anime')(bot, db, writeDB);
require('./menus/support')(bot, db, writeDB);

// /start handler
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  if(!db.users[chatId]) db.users[chatId] = {};
  writeDB();

  bot.sendMessage(chatId,'Selamat datang di Bot MD Leekipli! Pilih menu:', mainMenu);

  if(db.promosi.text){
    bot.sendMessage(chatId, `📣 PROMOSI MD LEEKIPLI:\n\n${db.promosi.text}`);
  }
});
