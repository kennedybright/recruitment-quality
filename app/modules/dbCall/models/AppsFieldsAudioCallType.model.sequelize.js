'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class QaFieldsAudioCT extends Model {} 
  QaFieldsAudioCT.init({
    field_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    call_type_id: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    field_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    call_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    audio_smp: {
      type: DataTypes.STRING
    },
  },
  {
    sequelize,
    modelName: 'QaFieldsAudioCT',
    tableName: 'us_qa_apps_fields_audio_calltype',
    freezeTableName: true,
    timestamps: false
  })

  QaFieldsAudioCT.api = ['forms', 'fields', 'audio', 'calltypes']
  QaFieldsAudioCT.crud = ['findById', 'findAll']

  return QaFieldsAudioCT
}
