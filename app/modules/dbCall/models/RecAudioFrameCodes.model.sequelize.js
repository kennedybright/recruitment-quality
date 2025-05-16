'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class RecAudioFrameCodes extends Model {}
  RecAudioFrameCodes.init({
    frame_code_id: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      allowNull: false
    },
    frame_code: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    ai_enabled: { 
      type: DataTypes.BOOLEAN
    }
  },
  {
    sequelize,
    modelName: 'RecAudioFrameCodes',
    tableName: 'rec_audio_framecodes',
    freezeTableName: true,
    timestamps: false
  })

  RecAudioFrameCodes.api = ['data', 'framecodes']
  RecAudioFrameCodes.crud = ['findById', 'findAll']

  return RecAudioFrameCodes
}
