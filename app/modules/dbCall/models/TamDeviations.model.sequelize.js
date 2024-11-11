'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class TamDeviations extends Model {} 
  TamDeviations.init({
    deviation_id: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true
    },
    deviation: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'TamDeviations',
    tableName: 'us_qa_apps_tam_deviation',
    freezeTableName: true,
    timestamps: false
  })

  TamDeviations.api = ['data', 'deviations']
  TamDeviations.crud = ['findAll']

  return TamDeviations
}
