'use strict'

const nodemailer = require('nodemailer')
const config = require('../../../config')
const { google } = require('googleapis')

const oAuth2Client = new google.auth.OAuth2(config.google.clientID, config.google.clientSecret, config.google.redirectUri)
/*// Function used to generate initial authorization code for Gmail API
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ["https://www.googleapis.com/auth/gmail.send"]
})
console.log("Authorie this app by visiting this URL: ", authUrl)
*/

oAuth2Client.setCredentials({
  access_token: config.google.accessToken,
  refresh_token: config.google.refreshToken
})

const sendEmail = async (emailTo, pdfBuffer, reportName, riID, qrID) => {
  try {
    const reportDate = new Date()
    console.log(`[${reportDate}] New email trigger for Daily Monitoring Report: ${reportName.toUpperCase()} -- QR: ${qrID} // RI: ${riID} --`)
    const transporter = nodemailer.createTransport({
      host: "smtp.nlsn.media",
      port: 25,
      secure: false,
      auth: {
        type: "OAuth2",
        accessToken: `${oAuth2Client.credentials.access_token}`,
        refreshToken: `${oAuth2Client.credentials.refresh_token}`
      },
    })

    const messageHTML = `<p>Dear Contact Center Quality Manager,</p>
    
    <p>Please find below the daily monitoring report for the following RI: <strong>${riID}</strong>, conducted by the QR: <strong>${qrID}</strong>.</p>

    <h3><strong>${reportName} Details:</strong></h3>
      <ul>
        <li><strong>Report Date: </strong>${reportDate}</li>
        <li><strong>Quality Represenative (QR): </strong>${qrID}</li>
        <li><strong>Research Interviewer (RI): </strong>${riID}</li>
    `

    const info = await transporter.sendMail({
      from: "audioqualityreporting@nielsen.com",
      to: emailTo,
      subject: ` TEST EMAIL: Contact Center Quality - ${reportName} - ${riID}`,
      html: messageHTML,
      attachments: [{
        filename: `${reportName}-${reportDate.getFullYear()}-${reportDate.getMonth()}-${reportDate.getDate()}-QR_${qrID}-RI_${riID}.pdf`,
        contentType: 'application/pdf',
        content: pdfBuffer
      }]
    })

    console.log('Email sent successfully: ', info.response)
  } catch (err) {
    console.error('Error sending email:', err.message)
    throw err
  }
}

module.exports = { sendEmail }