'use strict'

const axios = require('axios')
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

    const url = `http://${config.appGateway}/infra/communication/send`
    const options = {
      headers: {
        authorization: req.headers.authorization
      },
      body,
    }

    const response = await axios.post(url, options)
    res.status(HttpStatus.OK).json(response.data)
    res.sendStatus(HttpStatus.OK)
  } catch (e) {
    console.log(e.stack)
    res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  }
}
