'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class ReportsAudioLCM extends Model {} 
  ReportsAudioLCM.init({
    ri_id: { 
      type: DataTypes.STRING(10), 
      primaryKey: true,
      unique: true,
      allowNull: false 
    },
    total_calls_monitored: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    total_live_calls: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    last_date_monitored: { 
      type: DataTypes.DATEONLY, 
      allowNull: false 
    },
    last_qr: { 
      type: DataTypes.STRING(10),
      allowNull: false
    },
    last_study: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    date_difference: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
  },
  {
    sequelize,
    modelName: 'ReportsAudioLCM',
    tableName: 'qa_reports_audio_last_call',
    freezeTableName: true,
    timestamps: false
  })
  
  ReportsAudioLCM.api = ['reports', 'audio', 'lcm']
  ReportsAudioLCM.crud = ['findAll']
  
  return ReportsAudioLCM
}
