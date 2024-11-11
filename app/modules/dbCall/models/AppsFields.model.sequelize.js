'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class QaFormsFields extends Model {} 
  QaFormsFields.init({
    field_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    app_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    field_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    field_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    optional: {
      type: DataTypes.BOOLEAN,
      allowNull: false    }
  },
  {
    sequelize,
    modelName: 'QaFormsFields',
    tableName: 'us_qa_apps_fields',
    freezeTableName: true,
    timestamps: false
  })

  QaFormsFields.api = ['forms', 'fields']
  QaFormsFields.crud = ['findById', 'findAll']

  return QaFormsFields
}
