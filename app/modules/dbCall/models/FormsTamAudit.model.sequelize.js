'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class FormsTamAudit extends Model {} 
  FormsTamAudit.init({
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
    modelName: 'FormsTamAudit',
    tableName: 'us_qa_forms_tam_audit',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'transaction_date'
  })
  
  FormsTamAudit.api = ['forms', 'audio', 'audit']
  FormsTamAudit.crud = ['create', 'update', 'findById', 'findAll']
  
  return FormsTamAudit
}
