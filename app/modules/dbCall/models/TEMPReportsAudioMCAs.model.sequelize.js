'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class TEMPReportsAudioMCABreakdown extends Model {} 
  TEMPReportsAudioMCABreakdown.init({
    record_number: { 
      type: DataTypes.BIGINT, 
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false 
    },
    qr_id: { 
      type: DataTypes.STRING(10), 
      allowNull: false 
    },
    ri_id: { 
      type: DataTypes.STRING(10), 
      allowNull: false 
    },
    sample_id: { 
      type: DataTypes.STRING(20), 
      allowNull: false 
    },
    audio_smp: { 
      type: DataTypes.STRING(5),
      allowNull: false
    },
    record_date: { 
      type: DataTypes.DATEONLY, 
      allowNull: false 
    },
    record_time: { 
      type: DataTypes.TIME, 
      allowNull: false 
    },
    ri_shift: { 
      type: DataTypes.STRING(2), 
      allowNull: false 
    },
    disposition: { 
      type: DataTypes.STRING(20) 
    },
    mca_category: { 
      type: DataTypes.STRING(50) 
    },
    mca_summary_observation: { 
      type: DataTypes.TEXT 
    }
  }, 
  {
    sequelize,
    modelName: 'TEMPReportsAudioMCABreakdown',
    tableName: 'qa_reports_audio_mca_breakdown_temp',
    freezeTableName: true,
    timestamps: false
  })
  
  TEMPReportsAudioMCABreakdown.api = ['reports', 'temp', 'audio', 'mca']
  TEMPReportsAudioMCABreakdown.crud = ['findById', 'findAll']
  
  return TEMPReportsAudioMCABreakdown
}
