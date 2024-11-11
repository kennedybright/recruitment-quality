'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class TamSkills extends Model {}
  TamSkills.init({
    skills_id: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true
    },
    skills: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'TamSkills',
    tableName: 'us_qa_apps_tam_skills',
    timestamps: false,
    freezeTableName: true
  })

  TamSkills.api = ['data', 'skills']
  TamSkills.crud = ['findAll']

  return TamSkills
}
