import 'babel-core/register'
import test from 'ava'
import should from 'should'
import './_testHelper'
import parser from '../src/parser'

test('has an uri property', t => {
  should(parser).have.property('uri')
})

test('has a fetch method', t => {
  should(parser).have.property('fetch').which.is.a.Function()
})

test('result of fetch should be an array', async t => {
  const result = await parser.fetch()
  should(result).be.an.Array()
})

test('result of fetch should contain 10 items', async t => {
  const result = await parser.fetch()
  should(result).have.length(10)
})
