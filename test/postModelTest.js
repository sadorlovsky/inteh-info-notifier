import 'babel-core/register'
import test from 'ava'
import './_testHelper'
import { ValidationError } from 'mongoose'
import { Post } from '../src/models'

const testPost = {
  title: 'Test title',
  link: 'http://test.link',
  date: Date.now(),
  text: 'Test text'
}

test('fails when create post without title', t => {
  t.throws(Post.create({ ...testPost, title: null }), ValidationError)
})

test('fails when create post without link', t => {
  t.throws(Post.create({ ...testPost, link: null }), ValidationError)
})

test('fails when create post without date', t => {
  t.throws(Post.create({ ...testPost, date: null }), ValidationError)
})

test('fails when create post without text', t => {
  t.throws(Post.create({ ...testPost, text: null }), ValidationError)
})

test('creates post ok', async t => {
  t.ok(await Post.create(testPost))
})

test.after(async t => {
  await Post.remove({})
})
