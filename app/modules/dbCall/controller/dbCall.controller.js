'use strict'

const HttpStatus = require('http-status')
const logger = require('../../../lib/logger').loggerFactory()
const orm = require('../../../lib/db').pgInstance.models
const BaseRepository = require('../repository/BaseTable')
const sequelize = require('sequelize')

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
    const pk = Object.keys(this.model.rawAttributes).find(attr => this.model.rawAttributes[attr].primaryKey)
    const data = req.body

    if (!Array.isArray(data)) {
      // single update
      try {
        const dbValue = await this.repo.update(data, {where: {[pk]: data[pk]}})
        res.status(HttpStatus.OK).json(dbValue)
      } catch (e) {
        logger.error(e)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message })
      }
    } else {
      // bulk update
      const transaction = await sequelize.Transaction()
      try {
        let dbValues = any
        for (const item in data) {
          const dbValue = await this.repo.update(item, { where: {[pk]: item[pk]}, transaction })
          dbValues.push(dbValue)
        }
        await transaction.commit()
        res.status(HttpStatus.OK).json(dbValues)
      } catch (e) {
        logger.error(e)
        await transaction.rollback()
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message })
      }
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
