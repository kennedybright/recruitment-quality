'use strict'

const createApp = require('../../../app')
const request = require('supertest')

jest.mock('../../../../app/node_modules/@nielsen-media/web-commons-authenticationservice', () => {
  return {
    verify: jest.fn().mockReturnValue(),
    setPublicKey: jest.fn().mockReturnValue(),
    parseHeaderToken: jest.fn().mockReturnValue()
  }
})

jest.mock('../../../middleware/prometheusOptions', () => {
  return {
    options: { isEnabled: false }
  }
})

test('sleep api', async () => {
  const app = await createApp()
  const timeToSleepInMs = 12
  const result = await request(app)
    .get('/usremoterecqa/sleep?time=' + timeToSleepInMs)
    .send()
  expect(result.statusCode).toBe(200)
  expect(JSON.parse(result.text)).toMatchObject({ sleepStatus: 'completed', sleepTime: timeToSleepInMs })
})
