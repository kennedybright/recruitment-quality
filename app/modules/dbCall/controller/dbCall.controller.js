'use strict'

const HttpStatus = require('http-status')
const logger = require('../../../lib/logger').loggerFactory()
const orm = require('../../../lib/db').pgInstance.models
const BaseRepository = require('../repository/BaseTable')
const { Op } = require('sequelize')

module.exports = class DBCallController {
  constructor(modelName) {
    this.model = orm[modelName]
    this.modelname = modelName
    
    this.pk = this.model.primaryKeyAttributes
    this.repo = new BaseRepository(this.model)
  }

  createRecord = async(req, res) => {
    try {
      const data = req.body
      if (!Array.isArray(data)) {
        // single create
        const dbValue = await this.repo.create(data)
        res.status(HttpStatus.OK).json(dbValue)
      } else {
        // bulk create
        const dbValues = await this.repo.bulkCreate(data)
        res.status(HttpStatus.OK).json(dbValues)
      }
    } catch (e) {
      logger.error(e)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message })
    }
  }
  
  getRecordById = async(req, res) => {
    try {
      const { id } = req.params
      const dbValue = await this.repo.findById(id)
      res.status(HttpStatus.OK).json(dbValue)
    } catch (e) {
      logger.error(e)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message })
    }
  }
  
  updateRecord = async(req, res) => {
    try {
      const { id } = req.params
      const data = req.body
      const dbValue = await this.repo.update(id, data)
      res.status(HttpStatus.OK).json(dbValue)
    } catch (e) {
      logger.error(e)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message })
    }
  }
  
  deleteRecord = async(req, res) => {
    try {
      const { id } = req.params
      const dbValue = await this.repo.delete(id)
      res.status(HttpStatus.OK).json(dbValue)
    } catch (e) {
      logger.error(e)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message })
    }
  }
  
  getAllRecords = async(req, res) => {
    try {
      const conditions = req.query
      const dbValues = await this.repo.findAll(conditions)
      res.status(HttpStatus.OK).json(dbValues)
    } catch (e) {
      logger.error(e)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message })
    }
  }
}  
