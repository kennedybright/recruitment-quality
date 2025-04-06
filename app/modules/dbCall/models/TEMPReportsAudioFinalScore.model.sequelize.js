'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class TEMPReportsAudioFinalScore extends Model {} 
  TEMPReportsAudioFinalScore.init({
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
    site_name_id: { 
      type: DataTypes.STRING(10), 
      allowNull: false 
    },
    ri_shift: { 
      type: DataTypes.STRING(2), 
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
      type: DataTypes.STRING(10), 
      allowNull: false 
    },
    disposition: { 
      type: DataTypes.STRING(20) 
    },
    total_opportunities: { 
      type: DataTypes.INTEGER 
    },
    total_deviations: { 
      type: DataTypes.INTEGER
    },
    final_score: { 
      type: DataTypes.DECIMAL
    },
  }, 
  {
    sequelize,
    modelName: 'TEMPReportsAudioFinalScore',
    tableName: 'qa_reports_audio_finalscore_temp',
    freezeTableName: true,
    timestamps: false
  })
  
  TEMPReportsAudioFinalScore.api = ['reports', 'temp', 'audio', 'cmr']
  TEMPReportsAudioFinalScore.crud = ['findById', 'findAll']
  
  return TEMPReportsAudioFinalScore
}
