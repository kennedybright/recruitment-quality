'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class ReportsAudioFinalScore extends Model {} 
  ReportsAudioFinalScore.init({
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
    modelName: 'ReportsAudioFinalScore',
    tableName: 'qa_reports_audio_finalscore',
    freezeTableName: true,
  })
  
  ReportsAudioFinalScore.api = ['reports', 'audio', 'cmr']
  ReportsAudioFinalScore.crud = ['findById', 'findAll']
  
  return ReportsAudioFinalScore
}
