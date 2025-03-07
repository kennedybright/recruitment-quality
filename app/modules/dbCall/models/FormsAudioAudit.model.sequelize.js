'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class FormsAudioAudit extends Model {} 
  FormsAudioAudit.init({
    audit_transaction_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    record_number: { 
      type: DataTypes.BIGINT,
      unique: true,
      allowNull: false 
    },
    app_id: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    audit_track:{
      type: DataTypes.ARRAY,
      allowNull: false
    },
    field_id: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    field_name: { 
      type: DataTypes.STRING(255), 
      allowNull: false 
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
      type: DataTypes.DATEONLY, 
      allowNull: false 
    },
    created_by: { 
      type: DataTypes.STRING(10), 
      allowNull: false 
    }
  }, 
  {
    sequelize,
    modelName: 'FormsAudioAudit',
    tableName: 'us_qa_forms_audio_audit',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'transaction_date'
  })
  
  FormsAudioAudit.api = ['forms', 'audio', 'audit']
  FormsAudioAudit.crud = ['create', 'update', 'findById', 'findAll']
  
  return FormsAudioAudit
}
