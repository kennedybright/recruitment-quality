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
  expect.assertions(12)
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
    .get(`/usremoterecqa/forms/fields`)
    .query({app_id: 1001})
  console.log(JSON.parse(getAppResult.text))
  expect(getAppResult.statusCode).toBe(200)

  const getQAResult = await request(app)
    .get(`/usremoterecqa/employees/qa/TRAIN`)
  console.log(JSON.parse(getQAResult.text))
  expect(getQAResult.statusCode).toBe(200)
  
  const getFormResult = await request(app)
    .get(`/usremoterecqa/forms/audio/historical/2748750`)
  const testForm = JSON.parse(getFormResult.text)
  console.log(testForm)
  expect(getFormResult.statusCode).toBe(200)

  const submitFormResult = await request(app)
    .post('/usremoterecqa/forms/temp/audio')
    .send(testForm)
  console.log('submitFormResult: ', JSON.parse(submitFormResult.text))
  expect(submitFormResult.statusCode).toBe(200)
  
  const getFormsResult = await request(app)
    .get(`/usremoterecqa/forms/audio/historical`)
    .query({
      record_date: '2024-11-15', 
      ri_id: 'MX103',
      qr_id: 'GQA25'
    })
  const testForms = JSON.parse(getFormsResult.text)
  console.log(testForms)
  expect(getFormsResult.statusCode).toBe(200)

  const submitFormsResult = await request(app)
    .post('/usremoterecqa/forms/temp/audio')
    .send(testForms)
  console.log('submitFormResult: ', JSON.parse(submitFormsResult.text))
  expect(submitFormResult.statusCode).toBe(200)

  const db = require('../../../lib/db')
  db.pgInstance.close()
})
