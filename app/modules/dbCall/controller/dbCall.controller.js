'use strict'

const HttpStatus = require('http-status')
const logger = require('../../../lib/logger').loggerFactory()
const orm = require('../../../lib/db').pgInstance
const BaseRepository = require('../repository/BaseTable')

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
        const result = await this.repo.create(data)
        res.status(HttpStatus.OK).json(result)
      } else {
        // bulk create
        const result = await this.repo.bulkCreate(data)
        res.status(HttpStatus.OK).json(result)
      }
    } catch (e) {
      console.error(e)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message })
    }
  }
  
  getRecordById = async(req, res) => {
    try {
      const { id } = req.params
      const result = await this.repo.findById(id)
      res.status(HttpStatus.OK).json(result)
    } catch (e) {
      console.error(e)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message })
    }
  }
  
  updateRecord = async(req, res) => {
    try {
      const data = req.body
      const result = await this.sequelize.transaction(async () => {
        if (data.length === 1) {
          await this.repo.update(data[0]) // single update
        } else {
          await this.repo.bulkUpdate(data) // bulk update
        }
      })// .filter(record => record !== null) // Filter out null records (failed updates)
      
      res.status(HttpStatus.OK).json(result)
    } catch (e) {
      console.error(e)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message })
    }
  }
  
  deleteRecord = async(req, res) => {
    try {
      const ids = req.body
      const result = await this.sequelize.transaction(async () => {
        if (ids.length === 1) {
          await this.repo.delete(ids[0]) // single delete
        } else {
          await this.repo.bulkDelete(ids) // bulk delete
        }
      })// .filter(record => record !== null) // Filter out null records (failed updates)
      
      res.status(HttpStatus.OK).json(result)

      // Filter out null records (failed deletions)
      // const successfulDbValues = dbValues.filter(record => record !== null)
      // if (successfulDbValues?.length === ids.length) { 
      //   await transaction.commit()
      //   res.status(HttpStatus.OK).json(dbValues)
      // } else {
      //   const failedDbValues = ids.filter((_, index) => dbValues[index] === null)
      //   await transaction.rollback()
      //   res.status(HttpStatus.CONFLICT).json({ message: `Not all records were deleted. Transaction rolled back. Failed attempt to delete the following records: ${failedDbValues}` })
      // }
    } catch (e) {
      // await transaction.rollback()
      console.error(e)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message })
    }
  }
  
  getAllRecords = async(req, res) => {
    try {
      const conditions = req.query
      const result = await this.repo.findAll(conditions)
      res.status(HttpStatus.OK).json(result)
    } catch (e) {
      console.error(e)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message })
    }
  }
}  
