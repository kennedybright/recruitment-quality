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

// email daily quality monitoring report to leadership
const sendReport = async (emailTo, pdfBuffer, reportName, pdfFilename, riID, qrID) => {
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

    const messageHTML = `<p>Dear Contact Center Quality Ops Team,</p>
    
    <p>Please find below the daily monitoring report for the following RI: <strong>${riID}</strong>, conducted by the QR: <strong>${qrID}</strong>.</p>

    <h3><strong>${reportName} Details:</strong></h3>
      <ul>
        <li><strong>Report Date: </strong>${reportDate}</li>
        <li><strong>Quality Represenative (QR): </strong>${qrID}</li>
        <li><strong>Research Interviewer (RI): </strong>${riID}</li>
      </ul>
    `

    const info = await transporter.sendMail({
      from: "audioqualityreporting@nielsen.com",
      to: emailTo,
      subject: `Contact Center Quality - ${reportName} - ${riID}`,
      html: messageHTML,
      attachments: [{
        filename: pdfFilename,
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

// email system error report to support & leadership
const sendErrorReport = async (emailTo, user, subj, errorMessage) => {
  try {
    const emailDate = new Date()
    console.log(`[${emailDate}] New email trigger for System Error Report: ${subj} -- System User: ${user} --`)
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

    const messageHTML = `<p>Dear Contact Center Quality Ops Team,</p>

    <p>Please find below the following system error report from the following system user: <strong>${user}</strong>.</p>

    <h3><strong>Error Details:</strong></h3>
      <ul>
        <li><strong>Report Date: </strong>${emailDate}</li>
        <li><strong>Error Message: </strong>${errorMessage}</li>
      </ul>
    `

    const info = await transporter.sendMail({
      from: "audioqualityreporting@nielsen.com",
      to: emailTo,
      subject: `Contact Center Quality System Error: ${subj} - from user: ${user}`,
      html: messageHTML
    })

    console.log('Email sent successfully: ', info.response)
  } catch (err) {
    console.error('Error sending email:', err.message)
    throw err
  }
}

module.exports = { sendReport, sendErrorReport }