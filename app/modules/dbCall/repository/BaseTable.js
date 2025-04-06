'use strict'
const sequelize = require('../../../lib/db').pgInstance // initialized sequelize instance 

/**
  * @class BaseRepository
  * @description base repository for all tables
  */
module.exports = class BaseRepository {
  /**
   * 
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
      throw new Error(`Error creating record: ${error}`)
    }
  }

  /**
   * Bulk Create new records in the database
   * @param {Object} data - Data to insert
   * @returns {Promise<Object>} - Created records
   */
  async bulkCreate(data) {
    try {
      return await this.model.bulkCreate(data, {validate: true})
    } catch (error) {
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
      throw new Error(`Error finding record with ID [${id}]: ${error.message}`)
    }
  }

  /**
   * Update a record by its primary key
   * @param {string|number} id - Primary key value
   * @param {Object} data - Data to update
   * @param {Object} transaction - Sequelize transaction instance
   * @returns {Promise<Object|null>} - Updated record or null if not found
   */
  async update(id, data) {
    try {
      const updatedRecord = await this.model.update(data, { 
        where: { record_number: id },
        returning: true,
        transaction: transaction
      })
      return updatedRecord ?? null
    } catch (error) {
      throw new Error(`Error updating record with ID [${id}]: ${error.message}`)
    }
  }

  /**
   * Delete a record by its primary key
   * @param {string|number} id - Primary key value
   * @returns {Promise<boolean>} - True if deleted, false if not found
   */
  async delete(id) {
    try {
      const result = await this.model.destroy({ where: { id } })
      return result > 0
    } catch (error) {
      throw new Error(`Error deleting record with ID [${id}]: ${error.message}`)
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
      return await this.model.findAll({
        where: conditions,
        attributes: attributes || undefined,
      })
    } catch (error) {
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
      throw new Error(`Error checking existence of record with ID [${id}]: ${error.message}`)
    }
  }
}
