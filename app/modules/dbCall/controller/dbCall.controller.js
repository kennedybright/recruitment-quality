'use strict'

const HttpStatus = require('http-status')
const logger = require('../../../lib/logger').loggerFactory()
const orm = require('../../../lib/db').pgInstance
const BaseRepository = require('../repository/BaseTable')
// const Sequelize = require('sequelize')
// const { sequelizeModels } = require('../../../config/assets')

module.exports = class DBCallController {
  constructor(modelName) {
    this.sequelize = orm
    this.model = orm.models[modelName]
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
    const transaction = await this.sequelize.transaction()
    try {
      const updates = req.body
      let dbValues = []
      for (const item of updates) {
        const dbValue = await this.repo.update(item.record_number, item, transaction)
        dbValues.push(dbValue)
      }

      // Filter out null records (failed updates)
      const successfulDbValues = dbValues.filter(record => record !== null)
      if (successfulDbValues.length === updates.length) { 
        await transaction.commit()
        res.status(HttpStatus.OK).json(dbValues)
      } else {
        await transaction.rollback()
        logger.error('Not all records were updated. Transaction rolled back.');
        // logger.error('Successfully updated records:', successfulDbValues.map(r => r.record_number))
        console.error('Failed attempt to update the following records:', updates.filter((_, index) => dbValues[index] === null).map(r => r.record_number))
        res.status(HttpStatus.CONFLICT).json({ message: e.message })
      }
    } catch (e) {
      await transaction.rollback()
      logger.error(e)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message })
    }
  }
  
  deleteRecord = async(req, res) => {
    const transaction = await this.sequelize.transaction()
    try {
      const data = req.body.data
      logger.debug("Records to delete: ", req.body, data)
      let dbValues = []
      for (const item of data) {
        const dbValue = await this.repo.delete(item.record_number)
        dbValues.push(dbValue)
      }

      // Filter out null records (failed deletions)
      const successfulDbValues = dbValues.filter(record => record !== null)
      if (successfulDbValues.length === updates.length) { 
        await transaction.commit()
        res.status(HttpStatus.OK).json(dbValues)
      } else {
        await transaction.rollback()
        logger.error('Not all records were deleted. Transaction rolled back.');
        // logger.error('Successfully deleted records:', successfulDbValues.map(r => r.record_number))
        console.error('Failed attempt to delete the following records:', updates.filter((_, index) => dbValues[index] === null).map(r => r.record_number))
        res.status(HttpStatus.CONFLICT).json({ message: e.message })
      }
      // const { id } = req.params
      // const dbValue = await this.repo.delete(id)
      // res.status(HttpStatus.OK).json(dbValue)
    } catch (e) {
      await transaction.rollback()
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
