import TelegramBot from 'node-telegram-bot-api'
import botanio from 'botanio'

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true
})

const botan = botanio(process.env.BOTAN_TOKEN)

export { bot, botan }
