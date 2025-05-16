'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class QaEmployees extends Model {} 
  QaEmployees.init({
    qr_id: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(255)
    },
    last_name: {
      type: DataTypes.STRING(255)
    },
    full_name: {
      type: DataTypes.STRING(2048),
      allowNull: false
    },
    email_address: {
      type: DataTypes.STRING(2048)
    },
    title: {
      type: DataTypes.STRING(2048)
    },
    bilingual: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    lob: {
      type: DataTypes.STRING(255)
    },
    cost_center: {
      type: DataTypes.STRING(100)
    },
    site_name_id: {
      type: DataTypes.STRING(10)
    },
    team_lead: {
      type: DataTypes.STRING(2048)
    }
  },
  {
    sequelize,
    modelName: 'QaEmployees',
    tableName: 'qa_employees',
    freezeTableName: true,
    timestamps: false
  })

  QaEmployees.api = ['employees', 'qa']
  QaEmployees.crud = ['findById', 'findAll']

  return QaEmployees
}
