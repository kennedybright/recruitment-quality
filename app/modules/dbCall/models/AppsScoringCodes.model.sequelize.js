'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class QaScoringCodes extends Model {} 
  QaScoringCodes.init({
    code_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    code_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    app_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    code_input: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    opportunity: {
      type: DataTypes.BOOLEAN
    },
    deviation: {
      type: DataTypes.BOOLEAN
    },
    tam_deviation_id: {
      type: DataTypes.STRING(5)
    },
    tam_skills_id: {
      type: DataTypes.STRING(5)
    }
  },
  {
    sequelize,
    modelName: 'QaScoringCodes',
    tableName: 'qa_apps_scoring_codes',
    freezeTableName: true,
    timestamps: false
  })

  QaScoringCodes.api = ['forms', 'scoringcodes']
  QaScoringCodes.crud = ['findById', 'findAll']

  return QaScoringCodes
}
