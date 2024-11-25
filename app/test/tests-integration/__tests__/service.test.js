'use strict'

const createApp = require('../../../app')
const request = require('supertest')
jest.mock('../../../middleware/prometheusOptions', () => {
  return {
    options: { isEnabled: false }
  }
})

test('service: healthcheck', async () => {
  const app = await createApp()
  const result = await request(app)
    .get('/usremoterecqa/service/health')
    .send()
  expect(result.statusCode).toBe(200)
})

test('service: version', async () => {
  const app = await createApp()
  const result = await request(app)
    .get('/usremoterecqa/service/version')
    .send()
  expect(result.statusCode).toBe(200)
  expect(result.body.v).toBe(require('../../../package').version)
})
