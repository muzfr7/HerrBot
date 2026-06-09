# HerrBot 🇩🇪

A Telegram bot that helps you learn German — send German text and get corrections with grammar explanations.

## Features

- Corrects German sentences and explains grammar mistakes
- Per-chat conversation history (each user has their own context)
- `/new` — start a fresh conversation
- User allowlist — restrict access to specific Telegram users
- Activity logging with consola (user ID, username, message text)
- Powered by DeepSeek V4 Flash Free via OpenCode SDK

## Setup

```bash
npm install
cp .env.example .env
```

Edit `.env` and add your credentials:

- `BOT_TOKEN` — from [@BotFather](https://t.me/BotFather) on Telegram
- `DEEPSEEK_API_KEY` — your DeepSeek API key (if using DeepSeek directly)
- `ALLOWED_USERS` — comma-separated Telegram user IDs (empty = nobody allowed, must explicitly add users)

## Run

```bash
npm start
```

## Commands

- `/start` — welcome message
- `/help` — show available commands
- `/new` — reset conversation and start fresh
- Send any German text to get corrections

## License

MIT © 2026 Muzafar Ali Jatoi — see [LICENSE](LICENSE) for details.
