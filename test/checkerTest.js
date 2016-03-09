import 'babel-core/register'
import './_testHelper'
import test from 'ava'
import should from 'should'
import ms from 'ms'
import checker from '../src/checker'
import parser from '../src/parser'
import { User, Post } from '../src/models'

test('should have a delay property', t => {
  should(checker).have.property('delay').which.is.a.Number()
})

test('delay should be 10 minutes', t => {
  should(checker.delay).be.eql(ms('10m'))
})

test('should have a start method', t => {
  should(checker).have.property('start').which.is.a.Function()
})

test('should have a check method', t => {
  should(checker).have.property('check').which.is.a.Function()
})

test('should have a delivery method', t => {
  should(checker).have.property('delivery').which.is.a.Function()
})

test('should return all users with sub', async t => {
  const users = [
    {
      chatId: 996,
      sub: false
    },
    {
      chatId: 997
    },
    {
      chatId: 998,
      sub: false
    },
    {
      chatId: 999
    }
  ]
  await User.remove({})
  await User.create(users)
  const allCount = await User.find().count()
  t.is(allCount, 4)
  const subCount = await User.find({sub: true}).count()
  t.is(subCount, 2)
  const resultCount = await checker.delivery()
  t.same(subCount, resultCount)
  await User.remove({})
})

test('should not create post', async t => {
  await Post.remove({})
  const [lastPost] = await parser.fetch()
  await Post.create(lastPost)
  const countBefore = await Post.find().count()
  await checker.check()
  const countAfter = await Post.find().count()
  t.same(countAfter, countBefore)
  await Post.remove({})
})

test('should create one post', async t => {
  await Post.remove({})
  const fetched = await parser.fetch()
  await Post.create(fetched[1])
  const countBefore = await Post.find().count()
  t.is(countBefore, 1)
  await checker.check()
  const countAfter = await Post.find().count()
  t.is(countAfter, 2)
  await Post.remove({})
})

test('should create three posts', async t => {
  await Post.remove({})
  const fetched = await parser.fetch()
  await Post.create(fetched[3])
  const countBefore = await Post.find().count()
  t.is(countBefore, 1)
  await checker.check()
  const countAfter = await Post.find().count()
  t.is(countAfter, 4)
  await Post.remove({})
})
