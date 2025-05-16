'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class RecAudioCallTypes extends Model {} 
  RecAudioCallTypes.init({
    call_type_id: { 
      type: DataTypes.STRING(5), 
      primaryKey: true, 
      allowNull: false 
    },
    call_type: { 
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
    modelName: 'RecAudioCallTypes',
    tableName: 'rec_audio_calltypes',
    freezeTableName: true,
    timestamps: false
  })

  RecAudioCallTypes.api = ['data', 'calltypes']
  RecAudioCallTypes.crud = ['findById', 'findAll']

  return RecAudioCallTypes
}
