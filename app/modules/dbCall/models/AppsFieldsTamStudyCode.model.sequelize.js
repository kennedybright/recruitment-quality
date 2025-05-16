'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class QaFieldsTamSC extends Model {} 
  QaFieldsTamSC.init({
    field_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    field_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    study_code_id: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true
    },
    study_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  },
  {
    sequelize,
    modelName: 'QaFieldsTamSC',
    tableName: 'qa_apps_fields_tam_studycode',
    freezeTableName: true,
    timestamps: false
  })

  QaFieldsTamSC.api = ['forms', 'fields', 'tam', 'studycodes']
  QaFieldsTamSC.crud = ['findById', 'findAll']

  return QaFieldsTamSC
}
