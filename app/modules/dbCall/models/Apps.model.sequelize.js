'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class QaApps extends Model {}
  QaApps.init({
    app_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    app_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    app_effective_date: {
      type: DataTypes.DATE
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    modelName: 'QaApps',
    tableName: 'qa_apps',
    freezeTableName: true,
    timestamps: false
  })

  QaApps.api = ['apps']
  QaApps.crud = ['findById', 'findAll']

  return QaApps
}
