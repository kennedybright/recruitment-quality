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

test('email: emailing quality report', async () => {
  const app = await createApp()

  /*// API Call used to generate authorize app and retrieve tokens for Gmail API
  const authorize = await request(app)
    .get(`/usremoterecqa/auth/google/callback`)
    .query({code: '4/0AeanS0bL49v-qafO0oDcrFoR3d3-FTApqgpxTLRzpMsZRmfaqO_HIOwHx0NGy7ApDvTIUg'})
  expect(authorize.statusCode).toBe(200)
  console.log(authorize.text)
  //*/
  
  const getQAManagerEmail = await request(app)
    .get(`/usremoterecqa/employees/qa`)
    .query({title: 'Group Leader'})
  expect(getQAManagerEmail.statusCode).toBe(200)

  const result = await request(app)
    .post('/usremoterecqa/emailReport')
    .send({ 
      emailTo: ['kennedy.bright@nielsen.com'],
      pdfBase64: Buffer.from('test-pdf-content').toString('base64'),
      name:'MCA Report',
      ri:'TESTRI000',
      qr:'TESTQR000'
    })
  expect(result.statusCode).toBe(200)
  expect(result.body.message).toBe('Email sent successfully!')

  const db = require('../../../lib/db')
  db.pgInstance.close()
})
