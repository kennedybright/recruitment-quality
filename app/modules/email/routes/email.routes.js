'use strict'

const express = require('express')
const { sendReport, sendErrorReport } = require('../controller/email.controller')
const router = express.Router()
const { loadRoute } = require('../../../lib/updateManifest')

/*// Function used to generate initial authorization code and API tokens for Gmail API
router.get('/auth/google/callback', async (req, res) => {
    console.log(req.query)
    const { code } = req.query // get authorization code

    if (code) {
        try {
            const { tokens } = await oAuth2Client.getToken(code)
            console.log(tokens)
            console.log("Access token: ", tokens.access_token)
            console.log("Refresh token: ", tokens.refresh_token)

            oAuth2Client.setCredentials(tokens)
            res.send('Authorization successful! You can now send emails.')
        } catch (error) {
            console.error('Error retrieving tokens: ', error)
            res.send('Failed to retrieve tokens.')
        }
    } else {
        res.send('Authorization code not found.')
    }
})
*/

router.post('/emailReport', async (req, res) => {
  const { emailTo, pdfBase64, name, filename, ri, qr } = req.body

  try {
    const pdfBuffer = Buffer.from(pdfBase64, 'base64')
    await sendReport(emailTo, pdfBuffer, name, filename, ri, qr)
    return res.status(200).json({ message: 'Email sent successfully!' })
  } catch (error) {
    console.error('Failed to send email:', error.message)
    return res.status(500).json({ error: 'Failed to send email.' })
  }
})

router.post('/emailErrorReport', async (req, res) => {
  const { emailTo, user, subj, errorMessage } = req.body

  try {
    await sendErrorReport(emailTo, user, subj, errorMessage)
    return res.status(200).json({ message: 'Email sent successfully!' })
  } catch (error) {
    console.error('Failed to send email:', error.message)
    return res.status(500).json({ error: 'Failed to send email.' })
  }
})

loadRoute('/emailReport$', '/emailReport', 'POST', 'Trigger daily monitoring report email')
loadRoute('/emailErrorReport$', '/emailErrorReport', 'POST', 'Trigger system error report email')

module.exports = router
