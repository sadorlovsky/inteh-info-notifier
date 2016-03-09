import 'babel-core/register'
import mongoose from 'mongoose'
import nock from 'nock'
import config from '../config'

mongoose.connect(config.db['test'])
mongoose.Promise = global.Promise

nock('http://inteh-info.ru')
  .persist()
  .get('/studentam/rss')
  .replyWithFile(200, __dirname + '/fixtures/news.xml')
