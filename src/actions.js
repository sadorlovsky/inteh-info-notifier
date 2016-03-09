import moment from 'moment'
import { User, Post } from './models'

export async function ping (msg) {
  return 'pong'
}

export async function start (msg) {
  try {
    await User.findOrCreate({ chatId: msg.chat.id })
    return `Привет, ${msg.from.first_name} ❤️`
  } catch (err) {
    console.log(err)
  }
}

export async function sub (msg) {
  try {
    const user = await User.findOne({ chatId: msg.chat.id })
    user.sub = true
    await user.save()
    return `${msg.from.first_name}, вы подписались на новости`
  } catch (err) {
    console.log(err)
  }
}

export async function unsub (msg) {
  try {
    const user = await User.findOne({ chatId: msg.chat.id })
    user.sub = false
    await user.save()
    return `${msg.from.first_name}, вы отписались от новостей`
  } catch (err) {
    console.log(err)
  }
}

export async function lastnews (msg) {
  try {
    const lastNews = await Post.find({}).limit(10)
    let response = []
    lastNews.map((post) => {
      response.push(
        `• [${post.title}](${post.link}) (${moment(post.date).format('ll').locale('ru')})`
      )
    })
    return response.join('\n\n')
  } catch (err) {
    console.log(err)
  }
}
