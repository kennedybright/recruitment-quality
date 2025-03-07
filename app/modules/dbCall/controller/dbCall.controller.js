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
        const dbValue = await this.repo.create(data)
        res.status(HttpStatus.OK).json(dbValue)
      } else {
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
      const conditions = { where: { ...req.query } }
      if (conditions.where.record_date_after) {
        const parsedDate = new Date(value)
        conditions.where.record_date = { [Op.gt]: parsedDate }
      }
      // Object.entries(req.query).forEach(([key, value]) => {
      //   if (key === "record_date_after") {
      //     const parsedDate = new Date(value)
      //     conditions.where.record_date = { [Op.gt]: parsedDate }
      //   } else {
      //     conditions.where[key] = value
      //   }
      // })

      console.log("Sequelize GET Conditions: ", JSON.stringify(conditions, null, 2))
      const dbValues = await this.repo.findAll(conditions)
      res.status(HttpStatus.OK).json(dbValues)
    } catch (e) {
      logger.error(e)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message })
    }
  }
}  
