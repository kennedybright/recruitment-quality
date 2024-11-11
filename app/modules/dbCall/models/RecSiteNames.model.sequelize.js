'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class RecSiteNames extends Model {} 
  RecSiteNames.init({
    site_name_id: { 
      type: DataTypes.STRING(10), 
      primaryKey: true, 
      allowNull: false 
    },
    site_name: { 
      type: DataTypes.STRING(255), 
      allowNull: false 
    },
    active: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: true, 
      allowNull: false 
    }
  }, 
  {
    sequelize,
    modelName: 'RecSiteNames',
    tableName: 'us_rec_sitenames',
    freezeTableName: true,
    timestamps: false
  })

  RecSiteNames.api = ['data', 'sitenames']
  RecSiteNames.crud = ['findById', 'findAll']

  return RecSiteNames
}
