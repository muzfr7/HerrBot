import 'dotenv/config';
import { Telegraf } from 'telegraf';
import { consola } from 'consola';
import { handleText } from './bot.js';
import { closeClient, resetSession } from './ai/explain.js';

const bot = new Telegraf(process.env.BOT_TOKEN);

const allowed = (process.env.ALLOWED_USERS || '')
  .split(',').map(s => s.trim()).filter(Boolean);

function logUser(ctx, label = 'User message') {
  const { id, username, first_name } = ctx.from;
  const user = username ? `@${username}` : first_name;
  const text = ctx.message?.text || '';
  consola.info(`${label} — ${user} (${id})${text ? `: ${text}` : ''}`);
}

bot.use(async (ctx, next) => {
  if (ctx.from) {
    logUser(ctx);

    if (!allowed.includes(String(ctx.from.id))) {
      const user = ctx.from.username ? `@${ctx.from.username}` : ctx.from.first_name;
      consola.warn(`Blocked user — ${user} (${ctx.from.id})`);
      return ctx.reply('You are not authorized to use this bot.');
    }
  }

  return next();
});

bot.start((ctx) => ctx.reply('Welcome to HerrBot 🇩🇪'));
bot.help((ctx) => ctx.reply("Send any German text and I'll correct it with explanations.\n\nCommands:\n/new - Start a fresh conversation"));

bot.command('new', async (ctx) => {
  await resetSession(ctx.chat.id);
  ctx.reply('Started a fresh session. Send me your German text!');
});

bot.on('text', async (ctx) => {
  await handleText(ctx);
});

bot.launch();
consola.success('HerrBot running');

process.once('SIGINT', () => {
  closeClient();
  bot.stop('SIGINT');
});
process.once('SIGTERM', () => {
  closeClient();
  bot.stop('SIGTERM');
});
