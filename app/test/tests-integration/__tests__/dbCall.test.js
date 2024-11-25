'use strict'

const request = require('supertest')
jest.mock('../../../middleware/prometheusOptions', () => {
  return {
    options: { isEnabled: false }
  }
})

jest.mock('@nielsen-media/web-commons-authenticationservice', () => ({
  verify: () => {
    return Promise.resolve()
  },

  parseHeaderToken: () => (''),
  setPublicKey: () => (''),
  '@global': true
}))

const createApp = require('../../../app')

test('dbCall: creating/updating/getting a value', async () => {
  expect.assertions(9)
  const app = await createApp()
  const name = 'testName'
  const nameToUpdate = 'newTestName'
  const postResult = await request(app)
    .post('/usremoterecqa/testTable')
    .send({ name })
  console.log('postResult: ', postResult.text)
  expect(postResult.statusCode).toBe(200)

  const savedValue = JSON.parse(postResult.text)
  expect(savedValue.id).toBeTruthy()

  const updateResult = await request(app)
    .put(`/usremoterecqa/testTable/${savedValue.id}`)
    .send({ name: nameToUpdate })
  expect(updateResult.statusCode).toBe(200)

  const updatedValue = JSON.parse(updateResult.text)

  const getResult = await request(app)
    .get(`/usremoterecqa/testTable/${savedValue.id}`)
  expect(getResult.statusCode).toBe(200)
  expect(updatedValue).toEqual(JSON.parse(getResult.text))

  const deleteResult = await request(app)
    .delete(`/usremoterecqa/testTable/${savedValue.id}`)
  expect(deleteResult.statusCode).toBe(200)

  const getAppResult = await request(app)
    .get(`/usremoterecqa/apps/1001`)
  expect(getAppResult.statusCode).toBe(200)
  console.log(JSON.parse(getAppResult.text))

  const getFormResult = await request(app)
    .get(`/usremoterecqa/forms/audio/historical/2748750`)
  expect(getFormResult.statusCode).toBe(200)
  console.log(JSON.parse(getFormResult.text))

  const getQAResult = await request(app)
    .get(`/usremoterecqa/employees/qa/TRAIN`)
  expect(getQAResult.statusCode).toBe(200)
  console.log(JSON.parse(getQAResult.text))

  const db = require('../../../lib/db')
  db.pgInstance.close()
})
