'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class FormsAIAudioAudit extends Model {} 
  FormsAIAudioAudit.init({
    ai_audit_transaction_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    ai_record_number: { 
      type: DataTypes.BIGINT,
      allowNull: false 
    },
    app_id: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    model_version: { 
      type: DataTypes.STRING(5), 
      allowNull: false 
    },
    audit_track:{
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false
    },
    field_id: { 
      type: DataTypes.INTEGER, 
      allowNull: true 
    },
    field_name: { 
      type: DataTypes.STRING(255), 
      allowNull: true 
    },
    old_value: { 
      type: DataTypes.TEXT, 
      allowNull: true
    },
    new_value: { 
      type: DataTypes.TEXT, 
      allowNull: true
    },
    transaction_date: { 
      type: DataTypes.DATE, 
      allowNull: false 
    },
    created_by: { 
      type: DataTypes.STRING(10), 
      allowNull: false 
    }
  }, 
  {
    sequelize,
    modelName: 'FormsAIAudioAudit',
    tableName: 'qa_forms_ai_audio_audit',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'transaction_date',
    updatedAt: false
  })
  
  FormsAIAudioAudit.api = ['forms', 'ai', 'audio', 'audit']
  FormsAIAudioAudit.crud = ['create', 'findById', 'findAll']
  
  return FormsAIAudioAudit
}
