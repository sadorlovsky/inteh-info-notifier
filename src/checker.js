import ms from 'ms'
import moment from 'moment'
import mongoose from 'mongoose'
// import { delay } from 'lodash'
import parser from './parser'
import { User, Post } from './models'
import { bot } from './bot'

mongoose.Promise = global.Promise

const checker = {
  delay: ms('10m'),
  async delivery (post) {
    const message = `[${post.title}](${post.link}) (${moment(post.date).format('ll').locale('ru')})`
    const UsersWithSub = await User.find({ sub: true })
    UsersWithSub.map((user) => {
      bot.sendMessage(user, message, { parse_mode: 'Markdown' })
    })
  },
  async check () {
    try {
      const lastPost = await Post.findOne({}).sort('-date')
      const fetchedPosts = await parser.fetch()
      fetchedPosts.map(async function (post) {
        if (post.date > lastPost.date) {
          await Post.create(post)
        }
      })
    } catch (err) {
      console.log(err)
    }
  },
  start () {
    setInterval(this.check, this.delay)
  }
}

export default checker
