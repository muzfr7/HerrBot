import { explainText } from './ai/explain.js';

async function withLoading(ctx, fn) {
  const msg = await ctx.reply('⏳ Processing...');
  try {
    const result = await fn();
    await ctx.telegram.editMessageText(
      ctx.chat.id,
      msg.message_id,
      undefined,
      result,
      { parse_mode: 'HTML' }
    );
  } catch (e) {
    await ctx.telegram.editMessageText(
      ctx.chat.id,
      msg.message_id,
      undefined,
      'Error occurred'
    );
  }
}

export async function handleText(ctx) {
  const text = ctx.message.text;

  if (text.startsWith('/')) return;

  await withLoading(ctx, async () => {
    return explainText(text, ctx.chat.id);
  });
}
