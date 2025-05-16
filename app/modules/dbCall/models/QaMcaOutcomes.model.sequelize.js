'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class QaMcaOutcomes extends Model {} 
  QaMcaOutcomes.init({
    mca_outcome_id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      allowNull: false 
    },
    mca_outcome: { 
      type: DataTypes.STRING(255), 
      allowNull: false 
    }
  }, 
  {
    sequelize,
    modelName: 'QaMcaOutcomes',
    tableName: 'qa_mca_outcomes',
    freezeTableName: true,
    timestamps: false
  })

  QaMcaOutcomes.api = ['data', 'outcomes']
  QaMcaOutcomes.crud = ['findAll']

  return QaMcaOutcomes
}
