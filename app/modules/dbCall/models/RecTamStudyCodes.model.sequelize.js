'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class RecTamStudyCodes extends Model {} 
  RecTamStudyCodes.init({
    study_code_id: { 
      type: DataTypes.STRING, 
      primaryKey: true, 
      allowNull: false 
    },
    study_code: { 
      type: DataTypes.STRING(255), 
      allowNull: false 
    },
    active: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: true 
    },
    ai_enabled: { 
      type: DataTypes.BOOLEAN
    }
  }, 
  {
    sequelize,
    modelName: 'RecTamStudyCodes',
    tableName: 'rec_tam_studycodes',
    freezeTableName: true,
    timestamps: false
  })

  RecTamStudyCodes.api = ['data', 'studycodes']
  RecTamStudyCodes.crud = ['findById', 'findAll']

  return RecTamStudyCodes
}
