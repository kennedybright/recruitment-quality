'use strict'

const RP = require('request-promise')
const HttpStatus = require('http-status')
const config = require('../../../config')

const AuthenticationService = require('@nielsen-media/web-commons-authenticationservice')

module.exports.notify = async (req, res) => {
  try {
    const token = AuthenticationService.parseHeaderToken(req.headers.authorization)
    const requestDetails = await AuthenticationService.verify(token, { algorithms: ['RS256'] })
    const impersonatedEntityId = requestDetails.impersonated_entity_id
    const defaultEntityId = requestDetails.entity_id
    const entityId = impersonatedEntityId || defaultEntityId

    const body = {
      message: 'i am a server message',
      title: 'server title',
      entityId,
      deliveryType: 'BROWSER'
    }

    const options = {
      url: `http://${config.appGateway}/infra/communication/send`,
      method: 'POST',
      headers: {
        authorization: req.headers.authorization
      },
      body,
      json: true
    }
    RP(options)
    res.sendStatus(HttpStatus.OK)
  } catch (e) {
    console.log(e.stack)
    res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  }
}
