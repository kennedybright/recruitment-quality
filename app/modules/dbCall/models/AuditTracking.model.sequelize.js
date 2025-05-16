'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class QaAuditTracking extends Model {} 
  QaAuditTracking.init({
    audit_track_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    audit_track: {
      type: DataTypes.STRING(2048),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'QaAuditTracking',
    tableName: 'qa_audio_audittracking',
    freezeTableName: true,
    timestamps: false
  })

  QaAuditTracking.api = ['data', 'audittracking']
  QaAuditTracking.crud = ['findAll']

  return QaAuditTracking
}
