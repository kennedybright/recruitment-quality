'use strict'

const createApp = require('../../../app')
const request = require('supertest')

jest.mock('@nielsen-media/web-commons-authenticationservice', () => ({
  verify: () => {
    return Promise.resolve()
  },

  parseHeaderToken: () => (''),
  setPublicKey: () => (''),
  '@global': true
}))

jest.mock('../../../middleware/prometheusOptions', () => {
  return {
    options: { isEnabled: false }
  }
})

test('service: echo GET ', async () => {
  const app = await createApp()
  const result = await request(app)
    .get('/usremoterecqa/echo')
    .send()
  expect(result.statusCode).toBe(200)
})

test('service: echo POST', async () => {
  const app = await createApp()
  const result = await request(app)
    .post('/usremoterecqa/echo')
    .send()
  expect(result.statusCode).toBe(200)
  expect(result.body).toStrictEqual({})
})

test('service: echo POST with detailed payload', async () => {
  const app = await createApp()
  const status = 502
  const data = { data: 'test response' }
  const result = await request(app)
    .post('/usremoterecqa/echo')
    .send({
      status: status,
      payload: data,
      headers: [{ key: 'x-test', value: 'foo' }]
    })
  expect(result.statusCode).toBe(status)
  expect(result.body).toStrictEqual(data)
})
