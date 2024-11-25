'use strict'

const createApp = require('../../../app')
const request = require('supertest')
const { HOST_RESPONSE_LENGTH } = require('../../../modules/host/controller/host.controller')

jest.mock('../../../middleware/prometheusOptions', () => {
  return {
    options: { isEnabled: false }
  }
})

jest.mock('../../../../app/node_modules/@nielsen-media/web-commons-authenticationservice', () => {
  return {
    verify: jest.fn().mockReturnValue(),
    setPublicKey: jest.fn().mockReturnValue(),
    parseHeaderToken: jest.fn().mockReturnValue()
  }
})

test('get host', async () => {
  const app = await createApp()
  const result = await request(app)
    .get('/usremoterecqa/host')
    .send()
  expect(result.statusCode).toBe(200)
  expect(JSON.parse(result.text).host.length).toBe(HOST_RESPONSE_LENGTH)
})
