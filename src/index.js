import mongoose from 'mongoose'
import config from '../config'
import * as actions from './actions'
import checker from './checker'
import { bot, botan } from './bot'

mongoose.connect(config.db[process.env.NODE_ENV || 'development'])
mongoose.Promise = global.Promise

bot.on('message', (msg) => {
  try {
    const {
      text
    } = msg
    const command = text.substr(1).toLowerCase()
    const action = actions[command]
    botan.track(msg, command)
    action(msg)
      .then((response) => {
        bot.sendMessage(msg.chat.id, response, {
          parse_mode: 'Markdown'
        })
      })
      .catch((err) => {
        console.log(err)
      })
  } catch (err) {
    console.error(err)
  }
})

checker.start()
