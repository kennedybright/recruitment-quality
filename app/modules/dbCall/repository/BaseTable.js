'use strict'

const { Op } = require("sequelize")

/**
  * @class BaseRepository
  * @description base repository for all tables
  */
module.exports = class BaseRepository {
  /**
   * @constructor
   * @param {Object} modelName - Sequelize model name
   */
  constructor(model) {
    this.model = model
  }

  /**
   * Create a new record in the database
   * @param {Object} data - Data to insert
   * @returns {Promise<Object>} - Created record
   */
  async create(data) {
    try {
      return await this.model.create(data)
    } catch (error) {
      console.log("Error bulk creating: ", error)
      throw new Error(`Error creating record: ${error}`)
    }
  }

  /**
   * Bulk Create new records in the database
   * @param {Object[]} data - Data to insert
   * @returns {Promise<Object[]>} - Created records
   */
  async bulkCreate(data) {
    try {
      return await this.model.bulkCreate(data)
    } catch (error) {
      console.log("Error bulk creating: ", error)
      throw new Error(`Error bulk creating records: ${error}`)
    }
  }

  /**
   * Find a record by its primary key
   * @param {string|number} id - Primary key value
   * @returns {Promise<Object|null>} - Found record or null
   */
  async findById(id) {
    try {
      return await this.model.findByPk(id)
    } catch (error) {
      console.log("Error finding record by ID: ", error)
      throw new Error(`Error finding record with ID [${id}]: ${error.message}`)
    }
  }

  /**
   * Update a record by its primary key
   * @param {Object} data - Data to update
   * @returns {Promise<Object|null>} - Updated record or null if not found
   */
  async update(data) {
    try {
      const primaryKeyCol = this.model.primaryKeyAttribute // Get the primary key attribute name
      const updatedRecord = await this.model.update(data, { 
        where: { [primaryKeyCol]: data[primaryKeyCol] },
        returning: true
      })
      return updatedRecord ?? null
    } catch (error) {
      console.log("Error updating: ", error)
      throw new Error(`Error updating record [${id}]: ${error.message}`)
    }
  }

  /**
   * Bulk Update records by its primary key
   * @param {Object[]} data - Data to update
   * @returns {Promise<Object[]>} - Updated records
   */
  async bulkUpdate(data) {
    try {
      const primaryKeyCol = this.model.primaryKeyAttribute // Get the primary key attribute name
      let dbValues = []
      for (const item of data) {
        const dbValue = await this.model.update(item, { 
          where: { [primaryKeyCol]: item[primaryKeyCol] },
          returning: true
        })
        dbValues.push(dbValue)
      }
      return dbValues
    } catch (error) {
      console.log("Error bulk updating: ", error)
      throw new Error(`Error bulk updating records: ${error.message}`)
    }
  }

  /**
   * Delete a record by its primary key
   * @param {string|number} id - Primary key value
   * @returns {Promise<boolean>} - True if deleted, false if not found
   */
  async delete(id) {
    try {
      const primaryKeyCol = this.model.primaryKeyAttribute // Get the primary key attribute name
      const result = await this.model.destroy({ 
        where: { [primaryKeyCol]: id },
        returning: true
      })
      return result ?? null
    } catch (error) {
      console.log("Error deleting: ", error)
      throw new Error(`Error deleting record [${id}]: ${error.message}`)
    }
  }

  /**
   * Bulk Delete records by its primary key
   * @param {any[]} ids - Primary key values to delete
   * @returns {Promise<boolean>} - True if deleted, false if not found
   */
  async bulkDelete(ids) {
    try {
      const primaryKeyCol = this.model.primaryKeyAttribute // Get the primary key attribute name
      const result = await this.model.destroy({ 
        where: { [primaryKeyCol]: ids },
        returning: true
      })
      return result ?? null
    } catch (error) {
      console.log("Error bulk deleting: ", error)
      throw new Error(`Error bulk deleting records: ${error.message}`)
    }
  }

  /**
   * Find all records that match the specified conditions
   * @param {Object} [conditions={}] - Query conditions
   * @param {Array<string>} [attributes=null] - Fields to return
   * @returns {Promise<Array<Object>>} - Array of records
   */
  async findAll(conditions = {}, attributes = null) {
    try {
      const { record_date, after_date, before_date, ...otherConditions } = conditions
      return await this.model.findAll({
        where: {
          ...otherConditions,

          // custom date query (less than/equal, equal, OR greater than/equal)
          ...( before_date 
            ? { record_date: { [Op.lte]: before_date } }
            : after_date 
            ? { record_date: { [Op.gte]: after_date } }
            : record_date
            ? { record_date }
            : {}
          )
        },
        attributes: attributes || undefined,
      })
    } catch (error) {
      console.log("Error finding all records: ", error)
      throw new Error(`Error finding records: ${error.message}`)
    }
  }

  /**
   * Check if a record exists based on primary key
   * @param {string|number} id - Primary key value
   * @returns {Promise<boolean>} - True if exists, false otherwise
   */
  async exists(id) {
    try {
      const record = await this.findById(id)
      return !!record
    } catch (error) {
      console.log("Error checking record existence: ", error)
      throw new Error(`Error checking existence of record with ID [${id}]: ${error.message}`)
    }
  }
}
