import 'babel-core/register'
import test from 'ava'
import './_testHelper'
import { ValidationError } from 'mongoose'
import { User } from '../src/models'

const testUser = {
  chatId: 999
}

test('fails when create user without chatId', t => {
  t.throws(User.create({}), ValidationError)
})

test('creates user ok', async t => {
  t.ok(await User.create(testUser))
})

test('sets sub status to true by default', async t => {
  const user = await User.create(testUser)
  t.is(user.sub, true)
})

test.after(async t => {
  await User.remove({})
})
