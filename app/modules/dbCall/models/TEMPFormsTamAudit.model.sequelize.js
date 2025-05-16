'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class TEMPFormsTamAudit extends Model {} 
  TEMPFormsTamAudit.init({
    audit_transaction_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    record_number: { 
      type: DataTypes.BIGINT,
      allowNull: false 
    },
    app_id: { 
      type: DataTypes.INTEGER, 
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
    modelName: 'TEMPFormsTamAudit',
    tableName: 'qa_forms_tam_audit_temp',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'transaction_date',
    updatedAt: false
  })
  
  TEMPFormsTamAudit.api = ['forms', 'temp', 'audio', 'audit']
  TEMPFormsTamAudit.crud = ['create', 'findById', 'findAll']
  
  return TEMPFormsTamAudit
}
