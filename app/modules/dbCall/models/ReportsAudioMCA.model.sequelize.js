'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class ReportsAudioMCABreakdown extends Model {} 
  ReportsAudioMCABreakdown.init({
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
      type: DataTypes.BIGINT, 
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
    call_type_id: { 
      type: DataTypes.STRING(5), 
      allowNull: false 
    },
    frame_code_id: { 
      type: DataTypes.STRING(10), 
      allowNull: false 
    },
    call_direction: { 
      type: DataTypes.STRING(10) 
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
    modelName: 'ReportsAudioMCABreakdown',
    tableName: 'qa_reports_audio_mca_breakdown',
    freezeTableName: true,
    timestamps: false
  })
  
  ReportsAudioMCABreakdown.api = ['reports', 'audio', 'mca']
  ReportsAudioMCABreakdown.crud = ['findById', 'findAll']
  
  return ReportsAudioMCABreakdown
}
