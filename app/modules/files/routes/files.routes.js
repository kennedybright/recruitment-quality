'use strict'

const express = require('express')
const { downloadFile } = require('../controller/files.controller')
const router = express.Router()

router.get('/files/:fileId', downloadFile)

module.exports = router
