import rest from 'restling'
import cheerio from 'cheerio'
import iconv from 'iconv-lite'
import moment from 'moment'

const parser = {
  uri: 'http://inteh-info.ru/studentam/rss',
  dateTimeFormat: 'ddd, DD MMM YYYY HH:mm:ss Z',
  cheerioOptions: {
    xmlMode: true,
    normalizeWhitespace: true
  },
  async fetch () {
    let items = []
    try {
      const response = await rest.get(this.uri)
      const feed = await iconv.decode(response.response.raw, 'win1251')
      const $ = await cheerio.load(feed, this.cheerioOptions)

      await $('item').each((i, elem) => {
        items.push({
          title: $(elem).children('title').text(),
          link: $(elem).children('link').text(),
          date: moment($(elem).children('pubDate').text(), this.dateTimeFormat).locale('ru'),
          text: $(elem).children('description').next().text() // .replace(/\s+/g, ' ')
        })
      })

      return items
    } catch (err) {
      console.log(err)
    }
  }
}

export default parser
